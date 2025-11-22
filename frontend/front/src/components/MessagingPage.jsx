import React, { useState, useEffect } from 'react';
import { Mail, Send, Search, Star, Trash2, Archive, Clock, Paperclip, X } from 'lucide-react';
import { messageService } from '../services/messageService';
import { userService } from '../services/userService';
import { useAuth } from '../contexts/AuthContext';

const MessagingPage = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('tous');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCompose, setShowCompose] = useState(false);
  const [newMessage, setNewMessage] = useState({ receiverEmail: '', receiverRole: '', subject: '', content: '' });
  const [sendingMessage, setSendingMessage] = useState(false);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [roleFilter, setRoleFilter] = useState(''); // Filtre par rôle

  useEffect(() => {
    loadMessages();
    loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadUsers = async () => {
    setLoadingUsers(true);
    try {
      const allUsers = await userService.getAllUsers();
      setUsers(allUsers);
    } catch (error) {
      console.error('Erreur lors du chargement des utilisateurs:', error);
      setUsers([]);
    } finally {
      setLoadingUsers(false);
    }
  };

  const loadMessages = async () => {
    setLoading(true);
    try {
      const data = await messageService.getAllMessages();
      // Transform backend data to match frontend structure
      const transformedMessages = data.map(msg => {
        // Déterminer si c'est un message reçu ou envoyé
        const isReceived = msg.receiverEmail === user?.email;
        
        return {
          id: msg.id,
          expediteur: isReceived ? msg.senderEmail : msg.receiverEmail,
          expediteurRole: isReceived ? msg.senderRole : msg.receiverRole,
          sujet: msg.subject,
          contenu: msg.content,
          date: msg.createdAt,
          lu: msg.isRead,
          important: false, // Could be added to backend later
          categorie: 'academique',
          receiverEmail: msg.receiverEmail,
          receiverRole: msg.receiverRole,
          senderEmail: msg.senderEmail,
          senderRole: msg.senderRole,
          isReceived: isReceived
        };
      });
      setMessages(transformedMessages);
    } catch (error) {
      console.error('Erreur lors du chargement des messages:', error);
      // Fallback to empty array if error
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.receiverEmail || !newMessage.receiverRole || !newMessage.subject || !newMessage.content) {
      alert('Veuillez remplir tous les champs');
      return;
    }
    
    setSendingMessage(true);
    try {
      await messageService.sendMessage({
        receiverEmail: newMessage.receiverEmail,
        receiverRole: newMessage.receiverRole,
        subject: newMessage.subject,
        content: newMessage.content
      });
      
      alert('Message envoyé avec succès !');
      setShowCompose(false);
      setNewMessage({ receiverEmail: '', receiverRole: '', subject: '', content: '' });
      
      // Recharger les messages
      await loadMessages();
    } catch (error) {
      console.error('Erreur lors de l envoi:', error);
      alert('Erreur lors de l envoi du message');
    } finally {
      setSendingMessage(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await messageService.markAsRead(id);
      setMessages(messages.map(msg => 
        msg.id === id ? { ...msg, lu: true } : msg
      ));
    } catch (error) {
      console.error('Erreur lors du marquage comme lu:', error);
    }
  };

  const handleDeleteMessage = (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer ce message ?')) {
      setMessages(messages.filter(msg => msg.id !== id));
      setSelectedMessage(null);
    }
  };

  const filteredMessages = messages.filter(msg => {
    const matchesFilter = filter === 'tous' || 
      (filter === 'non_lus' && !msg.lu) ||
      (filter === 'important' && msg.important);
    
    const matchesSearch = msg.expediteur.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.sujet.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const unreadCount = messages.filter(msg => !msg.lu).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement de la messagerie...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <Mail className="w-8 h-8 text-blue-600" />
              Messagerie
            </h1>
            <p className="text-gray-600 mt-1">
              {unreadCount} message{unreadCount > 1 ? 's' : ''} non lu{unreadCount > 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={() => {
              setShowCompose(true);
              setRoleFilter(''); // Réinitialiser le filtre
              setNewMessage({ receiverEmail: '', receiverRole: '', subject: '', content: '' });
            }}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
          >
            <Send className="w-5 h-5" />
            Nouveau message
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Liste des messages */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Recherche et filtres */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setFilter('tous')}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    filter === 'tous' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Tous
                </button>
                <button
                  onClick={() => setFilter('non_lus')}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    filter === 'non_lus' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Non lus
                </button>
                <button
                  onClick={() => setFilter('important')}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    filter === 'important' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Important
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="overflow-y-auto max-h-[600px]">
              {filteredMessages.map((message) => (
                <div
                  key={message.id}
                  onClick={() => {
                    setSelectedMessage(message);
                    handleMarkAsRead(message.id);
                  }}
                  className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                    selectedMessage?.id === message.id ? 'bg-blue-50' : 'hover:bg-gray-50'
                  } ${!message.lu ? 'bg-blue-50 bg-opacity-30' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${!message.lu ? 'bg-blue-600' : 'bg-transparent'}`}></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-sm ${!message.lu ? 'font-bold text-gray-900' : 'font-semibold text-gray-700'} truncate`}>
                          {message.expediteur}
                        </span>
                        {message.important && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                      </div>
                      <p className={`text-sm ${!message.lu ? 'font-semibold' : ''} text-gray-800 truncate mb-1`}>
                        {message.sujet}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        {new Date(message.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contenu du message */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg overflow-hidden">
            {selectedMessage ? (
              <div className="flex flex-col h-full">
                {/* Header du message */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedMessage.sujet}</h2>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="font-semibold">De: {selectedMessage.expediteur}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {new Date(selectedMessage.date).toLocaleString('fr-FR')}
                        </span>
                      </div>
                      {selectedMessage.pieceJointe && (
                        <div className="mt-3 flex items-center gap-2 text-sm text-blue-600">
                          <Paperclip className="w-4 h-4" />
                          <span>{selectedMessage.pieceJointe}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDeleteMessage(selectedMessage.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  {selectedMessage.important && (
                    <div className="flex items-center gap-2 px-3 py-2 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                      <Star className="w-4 h-4 text-yellow-600 fill-current" />
                      <span className="text-sm font-semibold text-yellow-700">Message important</span>
                    </div>
                  )}
                </div>

                {/* Corps du message */}
                <div className="flex-1 p-6 overflow-y-auto">
                  <div className="prose max-w-none">
                    <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{selectedMessage.contenu}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-4 border-t border-gray-200 bg-gray-50">
                  <button 
                    onClick={() => {
                      setShowCompose(true);
                      // Si c'est un message reçu, répondre à l'expéditeur
                      // Si c'est un message envoyé, répondre au destinataire
                      const replyToEmail = selectedMessage.isReceived 
                        ? selectedMessage.senderEmail 
                        : selectedMessage.receiverEmail;
                      const replyToRole = selectedMessage.isReceived 
                        ? selectedMessage.senderRole 
                        : selectedMessage.receiverRole;
                      
                      setNewMessage({
                        receiverEmail: replyToEmail,
                        receiverRole: replyToRole,
                        subject: selectedMessage.sujet.startsWith('Re:') 
                          ? selectedMessage.sujet 
                          : `Re: ${selectedMessage.sujet}`,
                        content: `\n\n---\nMessage original de ${selectedMessage.expediteur}:\n${selectedMessage.contenu}`
                      });
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    Répondre
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                <div className="text-center">
                  <Mail className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Sélectionnez un message pour le lire</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Nouveau message */}
        {showCompose && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">Nouveau message</h3>
                <button
                  onClick={() => {
                    setShowCompose(false);
                    setRoleFilter(''); // Réinitialiser le filtre
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                {/* Filtre par rôle - seulement pour nouveau message */}
                {!selectedMessage || !newMessage.subject.startsWith('Re:') ? (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Filtrer par rôle
                    </label>
                    <select
                      value={roleFilter}
                      onChange={(e) => {
                        setRoleFilter(e.target.value);
                        // Réinitialiser le destinataire si on change le filtre
                        setNewMessage({ ...newMessage, receiverEmail: '', receiverRole: '' });
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Tous les rôles</option>
                      <option value="etudiant">Étudiants seulement</option>
                      <option value="enseignant">Enseignants seulement</option>
                      <option value="directeur_departement">Directeurs seulement</option>
                      <option value="administratif">Administratifs seulement</option>
                    </select>
                  </div>
                ) : null}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Destinataire <span className="text-red-500">*</span>
                  </label>
                  {!!selectedMessage && newMessage.subject.startsWith('Re:') ? (
                    <div>
                      <input
                        type="text"
                        value={`${newMessage.receiverEmail} (${newMessage.receiverRole})`}
                        readOnly
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                      />
                      <p className="text-xs text-gray-500 mt-1">Le destinataire est fixé pour la réponse</p>
                    </div>
                  ) : (
                    <div>
                      <select
                        value={`${newMessage.receiverEmail}|${newMessage.receiverRole}`}
                        onChange={(e) => {
                          const [email, role] = e.target.value.split('|');
                          setNewMessage({ ...newMessage, receiverEmail: email, receiverRole: role });
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="|">Sélectionner un destinataire</option>
                        {loadingUsers ? (
                          <option disabled>Chargement...</option>
                        ) : (
                          users
                            .filter(u => !roleFilter || u.role === roleFilter)
                            .map((u, idx) => (
                              <option key={idx} value={`${u.email}|${u.role}`}>
                                {u.nom} - {u.role === 'enseignant' ? 'Enseignant' : 
                                          u.role === 'etudiant' ? 'Étudiant' : 
                                          u.role === 'directeur_departement' ? 'Directeur' : 
                                          'Administratif'} ({u.email})
                              </option>
                            ))
                        )}
                      </select>
                      {users.filter(u => !roleFilter || u.role === roleFilter).length === 0 && !loadingUsers && (
                        <p className="text-xs text-amber-600 mt-1">
                          {roleFilter ? `Aucun utilisateur avec le rôle sélectionné` : 'Aucun utilisateur disponible'}
                        </p>
                      )}
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Sujet</label>
                  <input
                    type="text"
                    value={newMessage.subject}
                    onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Objet du message"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                  <textarea
                    value={newMessage.content}
                    onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
                    rows="8"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Écrivez votre message ici..."
                  ></textarea>
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={handleSendMessage}
                    disabled={sendingMessage}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                    {sendingMessage ? 'Envoi...' : 'Envoyer'}
                  </button>
                  <button
                    onClick={() => {
                      setShowCompose(false);
                      setRoleFilter(''); // Réinitialiser le filtre
                    }}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                  >
                    Annuler
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagingPage;