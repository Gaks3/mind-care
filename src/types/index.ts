export type Article = {
  id: number;
  title: string;
  createdBy: string;
  thumbnail: string;
  createdAt: string;
};

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  PSYCHOLOGY = 'PSYCHOLOGY',
}

export enum GenderUser {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export enum StatusUser {
  WORKER = 'WORKER',
  STUDENT = 'STUDENT',
}
