import { account } from './appwrite';

export const ADMIN_EMAIL = 'muhammad.aizaz0300@gmail.com';

export const loginAdmin = async (email: string, password: string) => {
  if (email !== ADMIN_EMAIL) {
    throw new Error('Unauthorized access');
  }
  
  try {
    const session = await account.createEmailPasswordSession
    (email, password);
    return session;
  } catch (error) {
    throw new Error('Invalid credentials');
  }
};

export const logoutAdmin = async () => {
  try {
    await account.deleteSession('current');
  } catch (error) {
    console.error('Logout error:', error);
  }
};

export const getCurrentSession = async () => {
  try {
    return await account.get();
  } catch (error) {
    return null;
  }
};

export const checkAuthStatus = async () => {
  try {
    const session = await account.getSession('current');
    return !!session;
  } catch (error) {
    return false;
  }
};

export const updateAdminPassword = async (currentPassword: string, newPassword: string) => {
  try {

    // If verification successful, update the password
    await account.updatePassword(newPassword, currentPassword);
    
    return true;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Current password is incorrect');
    }
    throw new Error('Failed to update password');
  }
};
