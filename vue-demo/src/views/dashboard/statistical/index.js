const download = (data,value) => {
  console.log(data, '导出的数据')
  if (!data) {
    return;
  }
  let url = window.URL.createObjectURL(new Blob([data]));
  let link = document.createElement("a");
  link.style.display = "none";
  link.href = url;
  link.setAttribute("download", `${value}.xls`);
  document.body.appendChild(link);
  link.click();
}
export default download