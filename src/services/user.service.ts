"use client";
import { AuthUserDetail } from "@/interfaces/user.interface";
import apisauce from "./apiSauce";

export class UserService {
  /**
   * Get user details by ID
   */
  async getUserDetail(userId: string): Promise<AuthUserDetail> {
    const response = await apisauce.get(`/users/${userId}`);
    console.log("++++++++++", response.data);
    if (!response.ok) {
      throw new Error(response.problem || "Failed to fetch user details");
    }
    return response.data as AuthUserDetail;
  }

  /**
   * List all users
   */
  async listUsers(): Promise<AuthUserDetail[]> {
    const response = await apisauce.get("/users");
    if (!response.ok) {
      throw new Error(response.problem || "Failed to fetch users");
    }
    return response.data as AuthUserDetail[];
  }

  /**
   * Update user profile
   */
  async updateUser(
    userId: string,
    data: Partial<AuthUserDetail>
  ): Promise<AuthUserDetail> {
    const response = await apisauce.put(`/users/${userId}`, data);
    if (!response.ok) {
      throw new Error(response.problem || "Failed to update user");
    }
    return response.data as AuthUserDetail;
  }

  /**
   * Delete user
   */
  async deleteUser(userId: string): Promise<void> {
    const response = await apisauce.delete(`/users/${userId}`);
    if (!response.ok) {
      throw new Error(response.problem || "Failed to delete user");
    }
  }
}

export const userService = new UserService();
export default userService;
