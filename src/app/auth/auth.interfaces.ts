interface IAuthCredentials {
   username: string,
   password: string
}

interface IAuthToken {
   username: string,
   token: string
}

export { IAuthCredentials, IAuthToken }