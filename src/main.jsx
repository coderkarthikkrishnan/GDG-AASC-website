import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';
import App from './App.jsx';

import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Events from './pages/Events.jsx';
import Gallery from './pages/Gallery.jsx';
import NotFound from './pages/NotFound.jsx';

import { AuthProvider } from './AuthContext.jsx';
import RequireAuth from './RequireAuth.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';

// Lazy‑loaded heavy pages
import { Admin, EventEdit, TeamEdit, PostEdit, GalleryUpload, Resources, ResourceEdit } from './lazy';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'events', element: <Events /> },

      // Event create & edit
      {
        path: 'events/new',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<p />}>
              <EventEdit />
            </Suspense>
          </ProtectedRoute>
        )
      },
      {
        path: 'events/edit/:id',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<p />}>
              <EventEdit />
            </Suspense>
          </ProtectedRoute>
        )
      },

      { path: 'gallery', element: <Gallery /> },

      // Admin pages
      {
        path: 'admin',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<p />}>
              <Admin />
            </Suspense>
          </ProtectedRoute>
        )
      },
      {
        path: 'admin/team',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<p />}>
              <TeamEdit />
            </Suspense>
          </ProtectedRoute>
        )
      },
      {
        path: 'admin/team/:id',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<p />}>
              <TeamEdit />
            </Suspense>
          </ProtectedRoute>
        )
      },
      {
        path: 'admin/gallery',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<p />}>
              <GalleryUpload />
            </Suspense>
          </ProtectedRoute>
        )
      },

      // Resources (auth read) + CRUD (admin)
      {
        path: 'resources',
        element: (
          <RequireAuth>
            <Suspense fallback={<p />}>
              <Resources />
            </Suspense>
          </RequireAuth>
        )
      },
      {
        path: 'resources/new',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<p />}>
              <ResourceEdit />
            </Suspense>
          </ProtectedRoute>
        )
      },
      {
        path: 'resources/edit/:id',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<p />}>
              <ResourceEdit />
            </Suspense>
          </ProtectedRoute>
        )
      },

      { path: '*', element: <NotFound /> }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ErrorBoundary>
  </StrictMode>
);
