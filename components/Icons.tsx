import React from 'react';
import { Home, Briefcase, Copyright, FileWarning, Users, Scale, MessageSquare, BookOpen, ChevronRight, AlertCircle, Loader2, X, Bot, ThumbsUp, ThumbsDown } from 'lucide-react';

export const Icons = {
  Home,
  Briefcase,
  Copyright,
  FileWarning,
  Users,
  Scale,
  MessageSquare,
  BookOpen,
  ChevronRight,
  AlertCircle,
  Loader2,
  X,
  Bot,
  ThumbsUp,
  ThumbsDown
};

interface IconProps {
  name: keyof typeof Icons;
  className?: string;
}

export const DynamicIcon: React.FC<IconProps> = ({ name, className }) => {
  const IconComponent = Icons[name];
  if (!IconComponent) return null;
  return <IconComponent className={className} />;
};