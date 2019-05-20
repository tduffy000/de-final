class UserService {
    static currInstance = null;

    static getUser() {
        if (this.currInstance == null) {
            this.currInstance = new UserService();
        }
        return this.currInstance;
    }

    addUser = (fname, lname,email,role) => {
      console.log("fname",fname,"lname",lname,"email",email,"role",role);
      return "Success";
        // return APPLLO_CLIENT.mutate({
        //     mutation: query.CREATE_COURSE,
        //     variables: {
        //         name:name,
        //         facultyID:facultyId,
        //     }}
        // );
    };

    deleteUser = (email) => {
      console.log("email",email);
      return "Success";
        // return APPLLO_CLIENT.mutate({
        //     mutation: query.CREATE_COURSE,
        //     variables: {
        //         name:name,
        //         facultyID:facultyId,
        //     }}
        // );
    };
}

const myUserService = UserService.getUser();
export default myUserService;
