import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { scheduleService } from '../services/scheduleService';
import './ScheduleViewer.css';

const ScheduleViewer = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [schedules, setSchedules] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Créneaux horaires standards
  const timeSlots = [
    '08:00-09:30',
    '09:45-11:15', 
    '11:30-13:00',
    '14:00-15:30',
    '15:45-17:15'
  ];

  // Jours de la semaine
  const weekDays = [
    'Lundi',
    'Mardi', 
    'Mercredi',
    'Jeudi',
    'Vendredi'
  ];

  useEffect(() => {
    loadSchedules();
  }, []);

  const loadSchedules = async () => {
    try {
      setLoading(true);
      
      try {
        // Essayer de charger depuis l'API
        const schedulesData = await scheduleService.getAllSchedules();
        setSchedules(schedulesData);
      } catch (apiError) {
        console.warn('API non disponible, utilisation des données de test:', apiError);
        
        // Données de test en fallback
        const mockSchedules = [
          {
            id: 1,
            className: 'L1 Info',
            semester: '2024-2025',
            validated: true,
            createdAt: '2024-11-15',
            courses: [
              {
                day: 'Lundi',
                timeSlot: '08:00-09:30',
                subject: { nom: 'Programmation Java', couleur: '#4CAF50' },
                teacher: { nom: 'Dupont', prenom: 'Jean' },
                room: { nom: 'Lab Info 1' }
              },
              {
                day: 'Lundi', 
                timeSlot: '09:45-11:15',
                subject: { nom: 'Base de données', couleur: '#2196F3' },
                teacher: { nom: 'Martin', prenom: 'Marie' },
                room: { nom: 'Salle 101' }
              },
              {
                day: 'Mardi',
                timeSlot: '08:00-09:30',
                subject: { nom: 'Mathématiques', couleur: '#9C27B0' },
                teacher: { nom: 'Durand', prenom: 'Pierre' },
                room: { nom: 'Salle 203' }
              }
            ]
          },
          {
            id: 2,
            className: 'L2 Info',
            semester: '2024-2025',
            validated: false,
            createdAt: '2024-11-20',
            courses: [
              {
                day: 'Lundi',
                timeSlot: '14:00-15:30',
                subject: { nom: 'Réseaux informatiques', couleur: '#FF9800' },
                teacher: { nom: 'Durand', prenom: 'Pierre' },
                room: { nom: 'Lab Réseau' }
              }
            ]
          }
        ];
        setSchedules(mockSchedules);
      }
      
      setLoading(false);
    } catch (err) {
      setError('Erreur lors du chargement des emplois du temps');
      setLoading(false);
    }
  };

  const formatScheduleForGrid = (courses) => {
    const grid = {};
    weekDays.forEach(day => {
      grid[day] = {};
      timeSlots.forEach(slot => {
        grid[day][slot] = null;
      });
    });

    courses.forEach(course => {
      if (grid[course.day] && grid[course.day][course.timeSlot] !== undefined) {
        grid[course.day][course.timeSlot] = course;
      }
    });

    return grid;
  };

  const getCourseStyle = (course) => {
    if (!course) return {};
    
    return {
      backgroundColor: course.subject.couleur || '#ccc',
      color: 'white',
      padding: '8px',
      borderRadius: '6px',
      fontSize: '0.8rem',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    };
  };

  const duplicateSchedule = async (scheduleId) => {
    try {
      await scheduleService.duplicateSchedule(scheduleId, null);
      alert('Emploi du temps dupliqué avec succès !');
      loadSchedules(); // Recharger la liste
    } catch (error) {
      console.error('Erreur lors de la duplication:', error);
      alert('Erreur lors de la duplication');
    }
  };

  const validateSchedule = async (scheduleId) => {
    try {
      await scheduleService.validateSchedule(scheduleId);
      alert('Emploi du temps validé avec succès !');
      loadSchedules(); // Recharger la liste
    } catch (error) {
      console.error('Erreur lors de la validation:', error);
      alert('Erreur lors de la validation');
    }
  };

  const deleteSchedule = async (scheduleId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet emploi du temps ?')) {
      return;
    }

    try {
      await scheduleService.deleteSchedule(scheduleId);
      alert('Emploi du temps supprimé avec succès !');
      loadSchedules(); // Recharger la liste
      setSelectedSchedule(null);
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      alert('Erreur lors de la suppression');
    }
  };

  if (loading) {
    return (
      <div className="schedule-viewer-loading">
        <div className="loading-spinner"></div>
        <p>Chargement des emplois du temps...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="schedule-viewer-error">
        <h2>❌ Erreur</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/director-dashboard')}>
          Retour au dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="schedule-viewer">
      <header className="viewer-header">
        <div className="header-left">
          <button 
            className="back-btn"
            onClick={() => navigate('/director-dashboard')}
          >
            ← Retour
          </button>
          <div>
            <h1>📋 Emplois du Temps</h1>
            <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.8 }}>
              Connecté en tant que: {user?.prenom} {user?.nom} ({user?.role})
            </p>
          </div>
        </div>
        <div className="header-right">
          <button 
            className="create-btn"
            onClick={() => navigate('/schedule-builder')}
          >
            ➕ Nouveau
          </button>
        </div>
      </header>

      <div className="viewer-content">
        <div className="schedules-list">
          <h3>📚 Emplois du temps disponibles</h3>
          {schedules.length === 0 ? (
            <div className="empty-schedules">
              <p>Aucun emploi du temps créé.</p>
              <button onClick={() => navigate('/schedule-builder')}>
                Créer le premier emploi du temps
              </button>
            </div>
          ) : (
            <div className="schedules-grid">
              {schedules.map(schedule => (
                <div
                  key={schedule.id}
                  className={`schedule-card ${selectedSchedule?.id === schedule.id ? 'selected' : ''}`}
                  onClick={() => setSelectedSchedule(schedule)}
                >
                  <div className="schedule-header">
                    <h4>{schedule.className}</h4>
                    <span className={`status ${schedule.validated ? 'validated' : 'draft'}`}>
                      {schedule.validated ? '✅ Validé' : '⏳ Brouillon'}
                    </span>
                  </div>
                  <div className="schedule-info">
                    <p><strong>Semestre:</strong> {schedule.semester}</p>
                    <p><strong>Créé le:</strong> {new Date(schedule.createdAt).toLocaleDateString()}</p>
                    <p><strong>Nombre de cours:</strong> {schedule.courses?.length || 0}</p>
                  </div>
                  <div className="schedule-actions">
                    <button 
                      className="view-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedSchedule(schedule);
                      }}
                    >
                      👁️ Voir
                    </button>
                    <button 
                      className="duplicate-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        duplicateSchedule(schedule.id);
                      }}
                    >
                      📄 Dupliquer
                    </button>
                    {!schedule.validated && (
                      <button 
                        className="validate-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          validateSchedule(schedule.id);
                        }}
                      >
                        ✅ Valider
                      </button>
                    )}
                    <button 
                      className="delete-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteSchedule(schedule.id);
                      }}
                    >
                      🗑️ Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {selectedSchedule && (
          <div className="schedule-preview">
            <div className="preview-header">
              <h3>📅 {selectedSchedule.className} - {selectedSchedule.semester}</h3>
              <div className="preview-actions">
                <button onClick={() => navigate(`/schedule-builder?edit=${selectedSchedule.id}`)}>
                  ✏️ Modifier
                </button>
                <button onClick={() => window.print()}>
                  🖨️ Imprimer
                </button>
              </div>
            </div>
            
            <div className="schedule-grid-preview">
              <div className="grid-header">
                <div className="time-header">Créneaux</div>
                {weekDays.map(day => (
                  <div key={day} className="day-header">{day}</div>
                ))}
              </div>
              
              {(() => {
                const grid = formatScheduleForGrid(selectedSchedule.courses || []);
                return timeSlots.map(timeSlot => (
                  <div key={timeSlot} className="grid-row">
                    <div className="time-slot">{timeSlot}</div>
                    {weekDays.map(day => (
                      <div key={`${day}-${timeSlot}`} className="schedule-cell-preview">
                        {grid[day]?.[timeSlot] ? (
                          <div style={getCourseStyle(grid[day][timeSlot])}>
                            <div className="course-name">
                              {grid[day][timeSlot].subject.nom}
                            </div>
                            <div className="course-teacher">
                              {grid[day][timeSlot].teacher?.prenom} {grid[day][timeSlot].teacher?.nom}
                            </div>
                            <div className="course-room">
                              {grid[day][timeSlot].room?.nom}
                            </div>
                          </div>
                        ) : (
                          <div className="empty-cell-preview">-</div>
                        )}
                      </div>
                    ))}
                  </div>
                ));
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleViewer;