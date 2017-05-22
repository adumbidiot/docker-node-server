window.popupManager = function(){
  this.base = document.createElement('div');
  this.base.style.cssText = 'display:none;background-color: rgba(0, 0, 0, 0.5);position:fixed;top:0px;height:100%;width:100%;left:0px;z-index:999';
  document.getElementsByTagName('body')[0].appendChild(this.base);
  
  this.contentHolder = document.createElement('div');
  this.contentHolder.style.cssText = 'position:fixed;width:80%;height:80%;top:10%;left:10%;background-color:rgba(255, 255, 255, 1)';
  this.base.appendChild(this.contentHolder);
}
