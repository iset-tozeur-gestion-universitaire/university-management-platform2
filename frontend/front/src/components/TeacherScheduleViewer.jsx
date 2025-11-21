import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import scheduleService from '../services/scheduleService';
import adminService from '../services/adminService';
import './ScheduleViewer.css';

const TeacherScheduleViewer = () => {
  const { user } = useAuth();
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [schedule, setSchedule] = useState(null);
  const [semestre, setSemestre] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const weekDays = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
  const timeSlots = [
    '08:00-10:00',
    '10:00-12:00',
    '12:00-14:00',
    '14:00-16:00',
    '16:00-18:00'
  ];

  useEffect(() => {
    loadTeachers();
  }, []);

  useEffect(() => {
    if (selectedTeacher) {
      loadTeacherSchedule();
    }
  }, [selectedTeacher, semestre]);

  const loadTeachers = async () => {
    try {
      setLoading(true);
      const data = await adminService.getEnseignants();
      
      // Filter by department if user is director
      const filteredTeachers = user?.role === 'directeur_departement' && user?.departement_id
        ? data.filter(t => t.departement?.id === user.departement_id)
        : data;
      
      setTeachers(filteredTeachers);
      setLoading(false);
    } catch (err) {
      console.error('Erreur lors du chargement des enseignants:', err);
      setError('Impossible de charger la liste des enseignants');
      setLoading(false);
    }
  };

  const loadTeacherSchedule = async () => {
    if (!selectedTeacher) return;

    try {
      setLoading(true);
      setError(null);
      setSchedule(null);
      
      const data = await scheduleService.getScheduleByTeacher(selectedTeacher.id, semestre);
      console.log('📅 Données emploi du temps reçues:', data);
      
      // Vérifier si l'emploi du temps est vide
      const isEmpty = !data || Object.keys(data).length === 0 || 
                      Object.values(data).every(day => !day || day.length === 0);
      
      if (isEmpty) {
        setError(`Aucun emploi du temps créé pour ${selectedTeacher.prenom} ${selectedTeacher.nom} au semestre ${semestre}`);
      } else {
        setSchedule(data);
        setError(null);
      }
      setLoading(false);
    } catch (err) {
      console.error('Erreur lors du chargement de l\'emploi du temps:', err);
      setSchedule(null);
      setError('Erreur lors du chargement de l\'emploi du temps');
      setLoading(false);
    }
  };

  const formatScheduleForGrid = (scheduleData) => {
    // Créer la grille avec tous les jours et tous les créneaux standards
    const grid = {};
    weekDays.forEach(day => {
      grid[day] = {};
      timeSlots.forEach(slot => {
        grid[day][slot] = null;
      });
    });

    if (!scheduleData) return grid;

    // Remplir la grille avec les cours
    Object.keys(scheduleData).forEach(day => {
      if (scheduleData[day] && Array.isArray(scheduleData[day])) {
        scheduleData[day].forEach(course => {
          console.log('📝 Course data:', course);
          console.log('📝 Matiere type:', typeof course.matiere, course.matiere);
          console.log('📝 Classe type:', typeof course.classe, course.classe);
          console.log('📝 Salle type:', typeof course.salle, course.salle);
          
          const timeSlot = `${course.heureDebut}-${course.heureFin}`;
          // Essayer de trouver le créneau correspondant
          if (grid[day]) {
            // Si le créneau exact existe, l'utiliser
            if (grid[day][timeSlot] !== undefined) {
              grid[day][timeSlot] = course;
            } else {
              // Sinon, trouver le créneau qui contient ce cours (pour compatibilité)
              const courseStart = course.heureDebut;
              const matchingSlot = timeSlots.find(slot => {
                const [slotStart] = slot.split('-');
                return slotStart === courseStart;
              });
              if (matchingSlot && grid[day][matchingSlot] === null) {
                grid[day][matchingSlot] = course;
              }
            }
          }
        });
      }
    });

    return grid;
  };

  const scheduleGrid = formatScheduleForGrid(schedule);

  return (
    <div className="schedule-viewer-container">
      <div className="schedule-viewer-header">
        <h1>📚 Emplois du Temps des Enseignants</h1>
        <p>Consultez les emplois du temps des enseignants de votre département</p>
      </div>

      <div className="schedule-controls">
        <div className="control-group">
          <label>Enseignant :</label>
          <select
            value={selectedTeacher?.id || ''}
            onChange={(e) => {
              const teacher = teachers.find(t => t.id === parseInt(e.target.value));
              setSelectedTeacher(teacher);
            }}
            className="control-select"
          >
            <option value="">-- Sélectionner un enseignant --</option>
            {teachers.map(teacher => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.prenom} {teacher.nom} - {teacher.specialite_enseignement || 'Non spécifié'}
              </option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label>Semestre :</label>
          <select
            value={semestre}
            onChange={(e) => setSemestre(parseInt(e.target.value))}
            className="control-select"
          >
            <option value={1}>Semestre 1</option>
            <option value={2}>Semestre 2</option>
          </select>
        </div>
      </div>

      {selectedTeacher && (
        <div className="teacher-info-card">
          <h3>👨‍🏫 {selectedTeacher.prenom} {selectedTeacher.nom}</h3>
          <p>Email: {selectedTeacher.email}</p>
          {selectedTeacher.departement && (
            <p>Département: {selectedTeacher.departement.nom}</p>
          )}
          {selectedTeacher.specialite_enseignement && (
            <p>Spécialité: {selectedTeacher.specialite_enseignement}</p>
          )}
        </div>
      )}

      {loading && <div className="loading">⏳ Chargement...</div>}

      {error && !loading && (
        <div className="error-message">
          <p>⚠️ {error}</p>
        </div>
      )}

      {!loading && schedule && !error && selectedTeacher && (
        <div className="schedule-grid-container">
          <table className="schedule-table">
            <thead>
              <tr>
                <th className="time-column">Horaires</th>
                {weekDays.map(day => (
                  <th key={day}>{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map(slot => (
                <tr key={slot}>
                  <td className="time-cell">{slot}</td>
                  {weekDays.map(day => {
                    const course = scheduleGrid[day]?.[slot];
                    return (
                      <td key={`${day}-${slot}`} className="schedule-cell">
                        {course ? (
                          <div className="course-card">
                            <div className="course-title">
                              {(() => {
                                if (typeof course.matiere === 'object' && course.matiere?.nom) {
                                  return course.matiere.nom;
                                } else if (typeof course.matiere === 'string') {
                                  return course.matiere;
                                }
                                return 'Matière';
                              })()}
                            </div>
                            <div className="course-details">
                              {(() => {
                                const classeText = typeof course.classe === 'object' 
                                  ? course.classe?.nom 
                                  : (typeof course.classe === 'string' ? course.classe : null);
                                return classeText ? (
                                  <div className="course-info">📚 {classeText}</div>
                                ) : null;
                              })()}
                              {(() => {
                                const salleText = typeof course.salle === 'object' 
                                  ? course.salle?.nom 
                                  : (typeof course.salle === 'string' ? course.salle : null);
                                return salleText ? (
                                  <div className="course-info">🏛️ {salleText}</div>
                                ) : null;
                              })()}
                            </div>
                          </div>
                        ) : null}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && !selectedTeacher && (
        <div className="no-selection">
          <p>👆 Veuillez sélectionner un enseignant pour voir son emploi du temps</p>
        </div>
      )}
    </div>
  );
};

export default TeacherScheduleViewer;
