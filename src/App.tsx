import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/Auth/ProtectedRoute";
import { AppLayout } from "@/components/Layout/AppLayout";

// Public pages
import Index from "./pages/Index";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Testimonials from "./pages/Testimonials";
import Products from "./pages/Products";
import Resources from "./pages/Resources";
import Blog from "./pages/Blog";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";

// Auth pages
import Auth from "./pages/Auth";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";

// User Management pages
import SubAdmins from "./pages/users/SubAdmins";
import AddSubAdmin from "./pages/users/AddSubAdmin";
import Instructors from "./pages/users/Instructors";
import AddInstructor from "./pages/users/AddInstructor";
import Students from "./pages/users/Students";
import AddStudent from "./pages/users/AddStudent";
import UserDetails from "./pages/users/UserDetails";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:slug" element={<Products />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/resources/:slug" element={<Resources />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<Blog />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            
            {/* Auth Routes */}
            <Route path="/auth" element={<Auth />} />
            
            {/* Onboarding - Protected but doesn't require onboarding completion */}
            <Route 
              path="/onboarding" 
              element={
                <ProtectedRoute>
                  <Onboarding />
                </ProtectedRoute>
              } 
            />
            
            {/* App Routes - Protected with onboarding requirement */}
            <Route 
              path="/app" 
              element={
                <ProtectedRoute requireOnboarding>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/app/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              {/* Placeholder routes for sidebar navigation */}
              <Route path="courses" element={<ComingSoon title="Courses" />} />
              <Route path="packages" element={<ComingSoon title="Packages" />} />
              <Route path="assets" element={<ComingSoon title="Assets Library" />} />
              <Route path="question-bank" element={<ComingSoon title="Question Bank" />} />
              <Route path="quiz-review" element={<ComingSoon title="Live Quiz Review" />} />
              <Route path="assignment-review" element={<ComingSoon title="Assignment Review" />} />
              <Route path="live-class" element={<ComingSoon title="Live Class" />} />
              <Route path="categories" element={<ComingSoon title="Categories" />} />
              <Route path="users/sub-admins" element={<SubAdmins />} />
              <Route path="users/sub-admins/add" element={<AddSubAdmin />} />
              <Route path="users/instructors" element={<Instructors />} />
              <Route path="users/instructors/add" element={<AddInstructor />} />
              <Route path="users/students" element={<Students />} />
              <Route path="users/students/add" element={<AddStudent />} />
              <Route path="users/:userId" element={<UserDetails />} />
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<ComingSoon title="Settings" />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

// Placeholder component for routes under development
function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
      <div className="text-center">
        <h1 className="text-3xl font-heading font-bold mb-4">{title}</h1>
        <p className="text-muted-foreground">
          This page is under development. Check back soon!
        </p>
      </div>
    </div>
  );
}

export default App;
