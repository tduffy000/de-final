class UserService {
    static currInstance = null;

    static getUser() {
        if (this.currInstance == null) {
            this.currInstance = new UserService();
        }
        return this.currInstance;
    }

    loginUser = (email,password) => {
      console.log("email:",email,"password:",password);
      return "Success";
        // return APPLLO_CLIENT.mutate({
        //     mutation: query.CREATE_COURSE,
        //     variables: {
        //         name:name,
        //         facultyID:facultyId,
        //     }}
        // );
    };


    addUser = (fname,email,password,role) => {
      console.log("fname:",fname,"email:",email,"password:",password,"role:",role);
      return "Success";
        // return APPLLO_CLIENT.mutate({
        //     mutation: query.CREATE_COURSE,
        //     variables: {
        //         name:name,
        //         facultyID:facultyId,
        //     }}
        // );
    };

    updateUser = (id,fname,email,password,role) => {
      console.log("id:",id,"fname:",fname,"email:",email,"password:",password,"role:",role);
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
