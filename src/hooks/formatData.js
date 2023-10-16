export const formatData=(data)=>{
  const format=[]
  const keys=Object.keys(data)
  Object.values(data).map((item,index) => {
    format.push({
      'id':keys[index],
      ...item
    })
  });
  return format
}
