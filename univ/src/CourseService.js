class CourseService {
    static currInstance = null;

    static getInstance() {
        if (this.currInstance == null) {
            this.currInstance = new CourseService();
        }
        return this.currInstance;
    }

    addCourse = (name, id) => {
      console.log("name",name,"id",id);
      return "Success";
        // return APPLLO_CLIENT.mutate({
        //     mutation: query.CREATE_COURSE,
        //     variables: {
        //         name:name,
        //         facultyID:facultyId,
        //     }}
        // );
    };

    addStudentToCourse = (id) => {
      console.log("id",id);
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

const myCourseService = CourseService.getInstance();
export default myCourseService;
