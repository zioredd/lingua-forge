'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import ResetPasswordForm from '@/components/ResetPasswordForm';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';
  return <ResetPasswordForm token={token} />;
}
