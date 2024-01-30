/*
* webworker 工具类（代替定时器）
* createworker：创建
* stopWorker：清除
* */
function create(f){
  var blob = new Blob(['('+f +')()'])
  var url = window.URL.createObjectURL(blob);
  var worker = new Worker(url);
  return worker;
}
export const createworker =(callback,time)=>{
  var pollingWorker = create(`function (e){
    setInterval(function (){
      this.postMessage(null)
    },${time})
  }`)
  pollingWorker.onmessage = callback
  return pollingWorker;
}
export const stopWorker =(vm)=>{
  try{
    vm&&vm.terminate()
  }catch (err){
    console.log(err)
  }
}
