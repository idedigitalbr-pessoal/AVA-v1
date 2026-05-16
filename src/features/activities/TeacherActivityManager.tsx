"use client";

import { useState } from "react";
import { ActivityDetail, ActivitySubmission } from "./types";
import { ActivityList } from "./ActivityList";
import { ActivityEditor } from "./ActivityEditor";
import { TeacherSubmissionsView } from "./TeacherSubmissionsView";
import { SubmissionGrader } from "./SubmissionGrader";
import { useActivityStore } from "./store";

interface TeacherActivityManagerProps {
  courseId: string;
  initialActivities?: ActivityDetail[];
}

export function TeacherActivityManager({ courseId, initialActivities = [] }: TeacherActivityManagerProps) {
  const store = useActivityStore();
  
  const activities = store.activities.filter(a => a.courseId === courseId);
  const courseActivityIds = activities.map(a => a.id);
  const submissions = store.submissions.filter(s => courseActivityIds.includes(s.activityId));

  const [viewMode, setViewMode] = useState<'LIST' | 'EDIT' | 'SUBMISSIONS' | 'GRADE'>('LIST');
  const [currentActivity, setCurrentActivity] = useState<Partial<ActivityDetail> | null>(null);
  const [currentSubmission, setCurrentSubmission] = useState<ActivitySubmission | null>(null);

  const handleCreate = () => {
    setCurrentActivity({
      courseId,
    });
    setViewMode('EDIT');
  };

  const handleEdit = (activity: ActivityDetail) => {
    setCurrentActivity(activity);
    setViewMode('EDIT');
  };

  const handleSaveActivity = (activity: Partial<ActivityDetail>) => {
    if (activity.id) {
       store.updateActivity(activity as ActivityDetail);
    } else {
       store.addActivity({ ...activity, id: Date.now().toString() } as ActivityDetail);
    }
    setViewMode('LIST');
  };

  const handleDeleteActivity = (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta atividade?")) {
      store.deleteActivity(id);
    }
  };

  const handleViewSubmissions = (activity: ActivityDetail) => {
    setCurrentActivity(activity);
    setViewMode('SUBMISSIONS');
  };

  const handleGradeSubmission = (submission: ActivitySubmission) => {
    setCurrentSubmission(submission);
    setViewMode('GRADE');
  };

  const handleSaveGrade = (grade: number, feedback: string) => {
    if (currentSubmission) {
       store.updateSubmission({ ...currentSubmission, grade, feedback, status: 'GRADED' });
       setViewMode('SUBMISSIONS');
    }
  };

  if (viewMode === 'EDIT' && currentActivity) {
    return <ActivityEditor 
             activity={currentActivity} 
             onSave={handleSaveActivity} 
             onCancel={() => setViewMode('LIST')} 
           />;
  }

  if (viewMode === 'SUBMISSIONS' && currentActivity) {
    return <TeacherSubmissionsView 
             activity={currentActivity as ActivityDetail} 
             submissions={submissions.filter(s => s.activityId === currentActivity.id)} 
             onBack={() => setViewMode('LIST')} 
             onGrade={handleGradeSubmission}
           />;
  }

  if (viewMode === 'GRADE' && currentActivity && currentSubmission) {
    return <SubmissionGrader 
             activity={currentActivity as ActivityDetail}
             submission={currentSubmission}
             onSave={handleSaveGrade}
             onCancel={() => setViewMode('SUBMISSIONS')}
           />;
  }

  return (
    <ActivityList 
      activities={activities}
      onCreate={handleCreate}
      onEdit={handleEdit}
      onViewSubmissions={handleViewSubmissions}
      onDelete={handleDeleteActivity}
    />
  );
}
