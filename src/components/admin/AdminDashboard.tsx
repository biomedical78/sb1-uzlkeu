import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/Tabs';
import { CourseManager } from './courses/CourseManager';
import { UserManager } from './users/UserManager';
import { Analytics } from './analytics/Analytics';
import { Settings } from './settings/Settings';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('courses');

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="courses">
          <CourseManager />
        </TabsContent>
        
        <TabsContent value="users">
          <UserManager />
        </TabsContent>
        
        <TabsContent value="analytics">
          <Analytics />
        </TabsContent>
        
        <TabsContent value="settings">
          <Settings />
        </TabsContent>
      </Tabs>
    </div>
  );
}