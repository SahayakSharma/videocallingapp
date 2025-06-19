


export function userDetailsValidator({fullName,dob,gender,phoneNumber}:{fullName:string,dob:Date, gender:string, phoneNumber:string}){
    if(!fullName || !dob || !gender || !phoneNumber) throw new Error("Insufficient date provided");

    const currentDate=new Date();
    if(dob > currentDate) throw new Error("Invalid date provided as DOB");
    if(phoneNumber.length != 10) throw new Error("Invalid phone number provided");
    const genders=['Male','Female','Others'];
    if(!genders.includes(gender)) throw new Error("Invalid gender provided");
}