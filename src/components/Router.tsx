import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { CreatePostPage } from '../pages/CreatePostPage';
import { EditPostPage } from '../pages/EditPostPage';

export const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/create-post" element={<CreatePostPage />} />
      <Route path="/edit-post/:postId" element={<EditPostPage />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
};