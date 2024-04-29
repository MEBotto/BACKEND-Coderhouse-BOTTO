export default class UserDto {
  constructor(user) {
    this._id = user._id;
    this.first_name = user.first_name
    this.last_name = user.last_name
    this.age = user.age;
    this.email = user.email;
    this.role = user.role;
    this.photo = user.photo;
    this.documents = user.documents;
    this.last_connection = user.last_connection;
  }
}