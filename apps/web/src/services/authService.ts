import apiClient from './apiClient';
import type { User } from '../types';

interface SendOtpResponse {
  message: string;
  expiresIn: number; // seconds
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: User;
}

// ─── Mock implementation ──────────────────────────────────────────────────────
// In production this calls the real core-service endpoints.
// For local demo, returns mock data so the UI is fully functional.
const MOCK_MODE = import.meta.env.VITE_MOCK_AUTH === 'true' || import.meta.env.DEV;

const mockUser: User = {
  id: 'usr-001',
  phone: '9876543210',
  name: 'Rajesh Kumar',
  role: 'PLANT_ADMIN',
  plantId: 'plant-001',
  createdAt: '2024-01-15T10:00:00Z',
};

export const authService = {
  async sendOtp(phone: string): Promise<SendOtpResponse> {
    if (MOCK_MODE) {
      console.log(`[AuthService] Mock OTP sent to +91 ${phone}. Use 123456 to log in.`);
      return { message: 'OTP sent successfully', expiresIn: 600 };
    }

    const { data } = await apiClient.post<SendOtpResponse>('/auth/send-otp', { phone });
    return data;
  },

  async verifyOtp(phone: string, otp: string): Promise<LoginResponse> {
    if (MOCK_MODE) {
      if (otp !== '123456') {
        throw new Error('Invalid OTP. Use 123456 for demo.');
      }
      const mockToken = 'eyJhbGciOiJIUzI1NiJ9.bW9jay10b2tlbi1mb3ItZGVtbw.mock';
      return {
        accessToken: mockToken,
        refreshToken: 'mock-refresh-token',
        expiresIn: 3600,
        user: { ...mockUser, phone },
      };
    }

    const { data } = await apiClient.post<LoginResponse>('/auth/login', { phone, otp });
    return data;
  },

  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    const { data } = await apiClient.post<{ accessToken: string }>('/auth/refresh', {
      refreshToken,
    });
    return data;
  },

  async logout(): Promise<void> {
    if (!MOCK_MODE) {
      await apiClient.post('/auth/logout').catch(() => { /* best-effort */ });
    }
    localStorage.removeItem('mfg_token');
    localStorage.removeItem('mfg_refresh');
  },
};
