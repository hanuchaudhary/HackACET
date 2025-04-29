export interface IUser {
  id: String;
  name: String;
  email: String;
  password: String;
  emailVerified: String;
  image: String;
  createdAt: String;
  updatedAt: String;
  accounts: IAccount[];
  posts: IPost[];
}

export interface IAccount {
  id: String;
  userId: String;
  type: String;
  provider: String;
  providerAccountId: String;
  access_token: String;
  access_token_secret: String;
  refresh_token: String;
  expires_at: Number;
  token_type: String;
  scope: String;
  id_token: String;
  session_state: String;
  createdAt: String;
  updatedAt: String;
}

export interface IPost {
  id: String;
  text: String;
  imageUrl: String;
  twitterId: String;
  status: String;
  scheduledAt: String;
  publishedAt: String;
  createdAt: String;
  updatedAt: String;
  userId: String;
}
