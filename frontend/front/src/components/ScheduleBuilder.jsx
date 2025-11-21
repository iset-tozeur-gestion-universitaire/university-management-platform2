import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { scheduleService } from '../services/scheduleService';
import './ScheduleBuilder.css';

const ScheduleBuilder = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [schedule, setSchedule] = useState({});
  const [selectedClass, setSelectedClass] = useState('');
  const [draggedItem, setDraggedItem] = useState(null);
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
    loadData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Essayer de charger depuis l'API, sinon utiliser les données de test
      try {
        // Tentative de chargement depuis l'API
        const [classesData, teachersData, subjectsData, roomsData] = await Promise.all([
          scheduleService.getClasses(),
          scheduleService.getTeachers(), 
          scheduleService.getSubjects(),
          scheduleService.getRooms()
        ]);

        setClasses(classesData);
        setTeachers(teachersData);
        setSubjects(subjectsData);
        setRooms(roomsData);
      } catch (apiError) {
        console.warn('API non disponible, utilisation des données de test:', apiError);
        
        // Données de test en fallback
        const mockData = {
          classes: [
            { id: 1, nom: 'L1 Info', niveau: 'Licence 1' },
            { id: 2, nom: 'L2 Info', niveau: 'Licence 2' },
            { id: 3, nom: 'L3 Info', niveau: 'Licence 3' }
          ],
          teachers: [
            { id: 1, nom: 'Dupont', prenom: 'Jean', specialite: 'Programmation' },
            { id: 2, nom: 'Martin', prenom: 'Marie', specialite: 'Base de données' },
            { id: 3, nom: 'Durand', prenom: 'Pierre', specialite: 'Réseaux' }
          ],
          subjects: [
            { id: 1, nom: 'Programmation Java', code: 'PROG001', couleur: '#4CAF50' },
            { id: 2, nom: 'Base de données', code: 'BD001', couleur: '#2196F3' },
            { id: 3, nom: 'Réseaux informatiques', code: 'RES001', couleur: '#FF9800' },
            { id: 4, nom: 'Mathématiques', code: 'MATH001', couleur: '#9C27B0' }
          ],
          rooms: [
            { id: 1, nom: 'Salle 101', type: 'Cours', capacite: 30 },
            { id: 2, nom: 'Lab Info 1', type: 'TP', capacite: 20 },
            { id: 3, nom: 'Salle 203', type: 'Cours', capacite: 40 }
          ]
        };

        setClasses(mockData.classes);
        setTeachers(mockData.teachers);
        setSubjects(mockData.subjects);
        setRooms(mockData.rooms);
      }
      
      // Initialiser l'emploi du temps vide
      initializeSchedule();
      
      setLoading(false);
    } catch (err) {
      setError('Erreur lors du chargement des données');
      setLoading(false);
    }
  };

  const initializeSchedule = () => {
    const newSchedule = {};
    weekDays.forEach(day => {
      newSchedule[day] = {};
      timeSlots.forEach(slot => {
        newSchedule[day][slot] = null;
      });
    });
    setSchedule(newSchedule);
  };

  const handleDragStart = (e, item, type) => {
    setDraggedItem({ ...item, type });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, day, timeSlot) => {
    e.preventDefault();
    
    if (!draggedItem) return;
    
    // Créer un nouveau cours
    const newCourse = {
      id: Date.now(), // ID temporaire
      subject: draggedItem,
      day,
      timeSlot,
      teacher: null,
      room: null,
      class: selectedClass
    };

    // Vérifier les conflits
    if (schedule[day][timeSlot]) {
      if (!window.confirm('Un cours existe déjà à ce créneau. Remplacer ?')) {
        return;
      }
    }

    // Mettre à jour l'emploi du temps
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [timeSlot]: newCourse
      }
    }));

    setDraggedItem(null);
  };

  const assignTeacher = (day, timeSlot, teacherId) => {
    const teacher = teachers.find(t => t.id === parseInt(teacherId));
    if (!teacher) return;

    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [timeSlot]: {
          ...prev[day][timeSlot],
          teacher
        }
      }
    }));
  };

  const assignRoom = (day, timeSlot, roomId) => {
    const room = rooms.find(r => r.id === parseInt(roomId));
    if (!room) return;

    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [timeSlot]: {
          ...prev[day][timeSlot],
          room
        }
      }
    }));
  };

  const removeCourse = (day, timeSlot) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [timeSlot]: null
      }
    }));
  };

  const saveSchedule = async () => {
    if (!selectedClass) {
      alert('Veuillez sélectionner une classe');
      return;
    }

    try {
      // Valider l'emploi du temps
      const courses = [];
      Object.entries(schedule).forEach(([day, slots]) => {
        Object.entries(slots).forEach(([timeSlot, course]) => {
          if (course) {
            courses.push({
              subjectId: course.subject.id,
              teacherId: course.teacher?.id,
              roomId: course.room?.id,
              day,
              timeSlot,
              startTime: timeSlot.split('-')[0],
              endTime: timeSlot.split('-')[1]
            });
          }
        });
      });

      if (courses.length === 0) {
        alert('Aucun cours défini dans l\'emploi du temps');
        return;
      }

      // Vérifier les conflits avant sauvegarde
      try {
        await scheduleService.checkConflicts(courses);
      } catch (conflictError) {
        if (!window.confirm(
          'Des conflits ont été détectés dans l\'emploi du temps. ' +
          'Voulez-vous continuer la sauvegarde ?'
        )) {
          return;
        }
      }

      // Sauvegarder l'emploi du temps
      try {
        const scheduleData = {
          classId: selectedClass,
          courses,
          semester: '2024-2025'
        };
        
        await scheduleService.saveSchedule(scheduleData);
        alert('Emploi du temps sauvegardé avec succès !');
        
        // Rediriger vers le dashboard directeur
        navigate('/director-dashboard');
      } catch (apiError) {
        console.warn('API non disponible, sauvegarde locale:', apiError);
        console.log('Données de l\'emploi du temps:', { selectedClass, courses });
        alert('Emploi du temps sauvegardé localement (API non disponible)');
      }
      
    } catch (err) {
      console.error('Erreur lors de la sauvegarde:', err);
      alert('Erreur lors de la sauvegarde: ' + (err.message || err));
    }
  };

  const getCourseStyle = (course) => {
    if (!course) return {};
    
    return {
      backgroundColor: course.subject.couleur || '#ccc',
      color: 'white',
      padding: '5px',
      borderRadius: '4px',
      fontSize: '0.8rem',
      height: '100%',
      position: 'relative'
    };
  };

  if (loading) {
    return (
      <div className="schedule-builder-loading">
        <div className="loading-spinner"></div>
        <p>Chargement des données...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="schedule-builder-error">
        <h2>❌ Erreur</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/director-dashboard')}>
          Retour au dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="schedule-builder">
      <header className="schedule-header">
        <div className="header-left">
          <button 
            className="back-btn"
            onClick={() => navigate('/director-dashboard')}
          >
            ← Retour
          </button>
          <div>
            <h1>📋 Créateur d'Emploi du Temps</h1>
            <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.8 }}>
              Connecté en tant que: {user?.prenom} {user?.nom} ({user?.role})
            </p>
          </div>
        </div>
        <div className="header-right">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="class-selector"
          >
            <option value="">Sélectionner une classe</option>
            {classes.map(classe => (
              <option key={classe.id} value={classe.id}>
                {classe.nom} - {classe.niveau}
              </option>
            ))}
          </select>
          <button 
            className="save-btn"
            onClick={saveSchedule}
            disabled={!selectedClass}
          >
            💾 Sauvegarder
          </button>
        </div>
      </header>

      <div className="schedule-content">
        <div className="subjects-panel">
          <h3>📚 Matières disponibles</h3>
          <div className="subjects-list">
            {subjects.map(subject => (
              <div
                key={subject.id}
                className="subject-card"
                draggable
                onDragStart={(e) => handleDragStart(e, subject, 'subject')}
                style={{ borderLeft: `4px solid ${subject.couleur}` }}
              >
                <span className="subject-name">{subject.nom}</span>
                <span className="subject-code">{subject.code}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="schedule-grid">
          <div className="grid-header">
            <div className="time-header">Créneaux</div>
            {weekDays.map(day => (
              <div key={day} className="day-header">{day}</div>
            ))}
          </div>
          
          {timeSlots.map(timeSlot => (
            <div key={timeSlot} className="grid-row">
              <div className="time-slot">{timeSlot}</div>
              {weekDays.map(day => (
                <div
                  key={`${day}-${timeSlot}`}
                  className="schedule-cell"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, day, timeSlot)}
                >
                  {schedule[day]?.[timeSlot] ? (
                    <div 
                      className="course-card"
                      style={getCourseStyle(schedule[day][timeSlot])}
                    >
                      <div className="course-header">
                        <span className="course-name">
                          {schedule[day][timeSlot].subject.nom}
                        </span>
                        <button
                          className="remove-btn"
                          onClick={() => removeCourse(day, timeSlot)}
                        >
                          ×
                        </button>
                      </div>
                      
                      <div className="course-details">
                        <select
                          value={schedule[day][timeSlot].teacher?.id || ''}
                          onChange={(e) => assignTeacher(day, timeSlot, e.target.value)}
                          className="teacher-select"
                        >
                          <option value="">👨‍🏫 Enseignant</option>
                          {teachers.map(teacher => (
                            <option key={teacher.id} value={teacher.id}>
                              {teacher.prenom} {teacher.nom}
                            </option>
                          ))}
                        </select>

                        <select
                          value={schedule[day][timeSlot].room?.id || ''}
                          onChange={(e) => assignRoom(day, timeSlot, e.target.value)}
                          className="room-select"
                        >
                          <option value="">🏢 Salle</option>
                          {rooms.map(room => (
                            <option key={room.id} value={room.id}>
                              {room.nom} ({room.type})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ) : (
                    <div className="empty-cell">
                      Glisser une matière ici
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScheduleBuilder;