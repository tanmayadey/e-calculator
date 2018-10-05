import { Component, OnInit } from '@angular/core';
import { CalculatorService } from '../calculator.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';



@NgModule({
  declarations: [
    
  ],
  imports: [
    BrowserModule
  ],
  providers: [CalculatorService],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  inputVal :String = "";
  resultVal :String ="0";
  totalString : String ="";
  optCount : number =0;
  optVal : String ="";
   numbutton1 :number= 1;
  numbutton2 :number=2;
  numbutton3:number=3;
  numbutton4:number=4;
  numbutton5:number=5;
  numbutton6:number=6;
  numbutton7:number=7;
  numbutton8:number=8;
  numbutton9:number=9;
  numbutton0 : number=0;
  numbuttonPoint : String = ".";
 
  lenVal :boolean =false;

  constructor(public _calculatorService : CalculatorService) { }

  ngOnInit() {
  }
  
  /**
  * @desc this is a type script method, is called from html page, after press 'C', it will reinitialize every things
  * 
  */
  clear(){
    this.inputVal ="";
    this.resultVal ="0";
    this._calculatorService.latestExpression ="";
    this._calculatorService.replaceExpression="";
    this._calculatorService.tobeReplace="";
    this._calculatorService.actualResult="";
    this.optCount =0;
    this.optVal="";
    this.totalString="";
    this._calculatorService.leftSideVal="";
    this._calculatorService.rightSideVal="";
    this._calculatorService.tobeReplace="";
    this.lenVal =false;
  }
  
  
  /**
  * @desc this is a type script method, is called from html page, after press '=', and give the final result
  * 
  */
  finalCal(){
    this.resultVal=  this._calculatorService.totalCal(this.totalString,this.optCount);
    this.inputVal = this._calculatorService.latestExpression.toString();
    this.totalString = this._calculatorService.latestExpression.toString();
    this.optCount =0;
    this.optVal ="";
    if(this.totalString.length>=15){
      this.lenVal=true;
    }
    if(this.totalString.indexOf("-")>-1){
            this.optCount++;
          }
    
    
    if(this.resultVal.indexOf(".")>-1 && this.resultVal.length > 12){
         this.resultVal =  this.resultVal.substr(0,this.resultVal.indexOf(".")+3)
      }
    if(this.resultVal.indexOf("=") == -1){
         this.resultVal = ("= ").concat(this.resultVal.toString());
      }

  }
  
  /**
  * @desc this is a type script method is called from html page, after each button pressto get the calculative result after each input value
  * @param var $val - Value each time when number or any operator clicked
  * @param var $optType - Describe the press button type , if number pressed it will be 'num' if opt press it will be 'opt'
  * @return String - calculative result
*/
  
  getValue(val,optType){
    
    
    if(optType == 'opt'){
      this.optCount++;
    }
    if(!this._calculatorService.checkOptSequence(val,this.totalString)){
        return;
    }
    if(!this._calculatorService.pointValidation(val,this.totalString,this.optCount)){
      return;
    }
    
    
    
    if(!this.lenVal){
        this.totalString = this.totalString+val;
    }else{
      if(val=="+" || val=="-"
            || val=="*"
            || val =="/"){
        this.optCount = this.optCount -1;
        //this.totalString = this.totalString+val;
        this.inputVal = this.totalString;
        this.resultVal = this.totalString;
        return;
      }
    }
    if(this.totalString.length >= 15){
      this.lenVal =true;
      console.log("len "+this.totalString.length+"val -> "+val +"--> "+this.totalString.charAt(this.totalString.length-2));
      
      if(this.totalString.length > 15 && this.totalString.charAt(this.totalString.length -2) == "+" ||
            this.totalString.charAt(this.totalString.length-2) == "-" ||
              this.totalString.charAt(this.totalString.length-2) == "/" ||
                this.totalString.charAt(this.totalString.length-2) == "*"){
        if(this.optCount == 1){
          return;
        }
      }
      
      if(this.optCount>0){ 
          
          this.finalCal();
          if(val=="+" || val=="-"
            || val=="*"
            || val =="/"){
            this.inputVal = this.inputVal+val;
          }
          this.totalString = this.inputVal;
          if(this.totalString.length >=15){
              this.lenVal =true;
        }else{
            this.lenVal =false;
          }
          
      }else{
        this.inputVal = this.totalString;
        this.resultVal = this.totalString;
        if(this.resultVal.indexOf("=") == -1){
         this.resultVal = ("= ").concat(this.resultVal.toString());      }

      }
    }else{
      this.resultVal = this._calculatorService.totalCal(this.totalString,this.optCount);
      this.inputVal = this.inputVal+val;
      if(this.resultVal.indexOf(".")>-1 && this.resultVal.length > 12 && (this.resultVal.indexOf(".")+3)<=this.resultVal.length){
         this.resultVal =  this.resultVal.substr(0,this.resultVal.indexOf(".")+3)
      }
      if(this.resultVal.indexOf("=") == -1){
          this.resultVal = ("= ").concat(this.resultVal.toString());
      }
    }
    return this.resultVal;
   
  }
  
  
  


}
