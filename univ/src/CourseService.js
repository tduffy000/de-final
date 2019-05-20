class CourseService {
    static currInstance = null;

    static getInstance() {
        if (this.currInstance == null) {
            this.currInstance = new CourseService();
        }
        return this.currInstance;
    }

    addCourse = (id, name) => {
      console.log("Name",name,"ProfessorId",id);
      return "Success";
        // return APPLLO_CLIENT.mutate({
        //     mutation: query.CREATE_COURSE,
        //     variables: {
        //         name:name,
        //         facultyID:facultyId,
        //     }}
        // );
    };

    deleteCourse = (id) => {
      console.log("CourseId",id);
      return "Success";
        // return APPLLO_CLIENT.mutate({
        //     mutation: query.CREATE_COURSE,
        //     variables: {
        //         name:name,
        //         facultyID:facultyId,
        //     }}
        // );
    };

    updateCourse = (courseid,name,profid) => {
      console.log("CourseId",courseid,"Name:",name,"ProfessorId:",profid);
      return "Success";
        // return APPLLO_CLIENT.mutate({
        //     mutation: query.CREATE_COURSE,
        //     variables: {
        //         name:name,
        //         facultyID:facultyId,
        //     }}
        // );
    };

    addStudentToCourse = (cid,sid) => {
      console.log("CourseId",cid,"StudentId",sid);
      return "Success";
        // return APPLLO_CLIENT.mutate({
        //     mutation: query.CREATE_COURSE,
        //     variables: {
        //         name:name,
        //         facultyID:facultyId,
        //     }}
        // );
    };

    removeStudentFromCourse = (cid,sid) => {
      console.log("CourseId",cid,"StudentId",sid);
      return "Success";
        // return APPLLO_CLIENT.mutate({
        //     mutation: query.CREATE_COURSE,
        //     variables: {
        //         name:name,
        //         facultyID:facultyId,
        //     }}
        // );
    };

    createAssignment = (id, name) => {
      console.log("CourseId",id,"Assignment",name);
      return "Success";
        // return APPLLO_CLIENT.mutate({
        //     mutation: query.CREATE_COURSE,
        //     variables: {
        //         name:name,
        //         facultyID:facultyId,
        //     }}
        // );
    };

    createAssignmentGrade = (aid,sid,grade) => {
      console.log("AssignmentId",aid,"StudentId",sid,"Grade",grade);
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
