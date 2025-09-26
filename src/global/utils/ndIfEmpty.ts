export function ndIfEmpty(rawVal: string | number | null | undefined){
  if(rawVal){
    if(typeof rawVal === "string"){
      rawVal = rawVal.trim()
      if(rawVal.length > 0){
        return rawVal
      }else{
        return "ND"
      }
    }else{
      //regresa un number
      return rawVal;
    }
  }else{
    return "ND";
  }
}