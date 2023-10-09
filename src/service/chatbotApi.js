import axios from "axios";

export const BASE_URL=`192.168.1.1:3000/api/bardapi`
// 192.168.1.4:3000/api/bardapi?ques=Hi
// http://localhost:3000/api/bardapi?ques=Hi
export const getBardApi=(userMsg)=>axios.get(BASE_URL+"?ques="+userMsg);
