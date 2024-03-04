export interface CreatePost {
  dto: {
    title: string;
    content: string;
    authorId: string;
  };
}

export interface UpdatePost {
  dto: {
    title: string;
    content: string;
  };
  id: string;
}

export interface CreateProfile {
  dto: {
    isMale: boolean;
    yearOfBirth: number;
    memberTypeId: string;
    userId: string;
  };
}

export interface UpdateProfile {
  id: string;
  dto: {
    isMale: boolean;
    yearOfBirth: number;
    memberTypeId: string;
  };
}

export interface CreateUser {
  dto: {
    name: string;
    balance: number;
  };
}

export interface UpdateUser {
  id: string;
  dto: {
    name: string;
    balance: number;
  };
}

export interface userSubscribedTo {
  userId: string;
  authorId: string;
}
