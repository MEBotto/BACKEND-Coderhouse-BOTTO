export default class UserDto {
  constructor(user) {
    this.name = user.first_name + user.last_name
    this.age = user.age;
    this.email = user.email;
    this.role = user.role;
  }
}