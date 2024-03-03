export interface CreatePost {
  title: string;
  content: string;
  authorId: string;
}

export interface UpdatePost {
  title: string;
  content: string;
  id: string;
}

export interface CreateProfile {
  isMale: boolean;
  yearOfBirth: number;
  memberTypeId: string;
  userId: string;
}

export interface UpdateProfile {
  id: string;
  isMale: boolean;
  yearOfBirth: number;
  memberTypeId: string;
}

export interface CreateUser {
  name: string;
  balance: number;
}

export interface UpdateUser {
  id: string;
  name: string;
  balance: number;
}
