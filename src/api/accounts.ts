import { SITE_URL } from "../config";

const BASE = `${SITE_URL}/api`;

export interface CreateAccountData {
  name: string;
  email: string;
  password: string;
  title: string;
  birth_date: string;
  birth_month: string;
  birth_year: string;
  firstname: string;
  lastname: string;
  company?: string;
  address1: string;
  address2?: string;
  country: string;
  zipcode: string;
  state: string;
  city: string;
  mobile_number: string;
}

interface ApiResponse {
  responseCode: number;
  message: string;
}

export async function createAccount(data: CreateAccountData): Promise<ApiResponse> {
  const body = new URLSearchParams();
  for (const [k, v] of Object.entries(data)) {
    if (v !== undefined) body.append(k, v);
  }

  const res = await fetch(`${BASE}/createAccount`, {
    method: "POST",
    body,
  });
  return res.json();
}

export async function deleteAccount(email: string, password: string): Promise<ApiResponse> {
  const body = new URLSearchParams({ email, password });

  const res = await fetch(`${BASE}/deleteAccount`, {
    method: "DELETE",
    body,
  });
  return res.json();
}
