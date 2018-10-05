import { Injectable } from '@angular/core';

@Injectable()
export class CalculatorService {
inputVal :String = "";
  resultVal :String ="0";
  actualResult : String ="";
  fisrtNum : String ="";
  temp : String ="";
  beforeOptResult : String ="";
  totalString : String ="";
  optCount : number =0;
  isSrqNum :boolean = true;
  secNum : number =0;
  numResult :String ="";
  latestExpression : String ="";
  leftSideVal : String ="";
  rightSideVal : String ="";
  fistMultiIndex : number;
  endMultiIdex : number ;
  replaceExpression : String ="";
  tobeReplace :String="";
  lenVal :boolean =false;
  constructor() { }
  
   /**
  * @desc will call from component class to get the output
  * @param String $totalExpression - input from user
  * @param String $optCount - number of operator present in input expression
  * @return String - return result
  * 
  */
  
  public totalCal(totalExpression, optCount){
    this.latestExpression = totalExpression;
    if(this.latestExpression.length == 1){
       let frstChar = this.latestExpression.charAt(0);
        if(frstChar  == "-" || frstChar  == "+"  || frstChar  == "*" || frstChar  == "/"){
          return;
        }      
      
    }
    
    for(var i=1; i<=optCount;i++){
      
     
          let optCountChk = i+1;
          if(this.latestExpression.indexOf("/")>=0){        
             this.getDivVal(this.latestExpression.indexOf("/"));  
                        
          }else if(this.latestExpression.indexOf("*")>=0){
              this.getMultiVal(this.latestExpression.indexOf("*"));
            
          } else if(this.latestExpression.indexOf("-") == 0 && optCountChk == this.optCount){
              let minusIndex = this.latestExpression.indexOf("-");
              this.getMinusVal(this.latestExpression.indexOf("-"));
              
            }else if(this.latestExpression.indexOf("+") >=0){ 
              this.getPlusVal(this.latestExpression.indexOf("+"));
            }else{
                 this.getMinusVal(this.latestExpression.indexOf("-"));
          }
          
    }
    
    if(this.latestExpression.indexOf("+")>0 || this.latestExpression.indexOf("-")>=0 || this.latestExpression.indexOf("*")>0 || this.latestExpression.indexOf("/")>0){
        this.resultVal = this.replaceExpression;
    }else{
        this.resultVal = this.latestExpression;
    }
      return this.resultVal;
    
  }
   /**
  * @desc will calculate the right child and left child of a operator and send it to div method to get the output
  * @param number $startIndex - start index to start the parse
  * @return String - return result
  * 
  */
  getMultiVal(startIndex : number){
    /**
  * block to get left and right child if a number 
    */
    for(var i=startIndex-1; i>=0;i-- ){
        if(this.latestExpression.charAt(i) != '/'&&  this.latestExpression.charAt(i) != '+' && this.latestExpression.charAt(i) != '*'){
           if(this.latestExpression.charAt(i) == "-"&& i != 0){
                this.leftSideVal = this.latestExpression.charAt(i)+this.leftSideVal;
                this.fistMultiIndex = i--;
                break;
           }else{
                this.leftSideVal = this.latestExpression.charAt(i)+this.leftSideVal;
          }
      }else{
          this.fistMultiIndex = i--;
          break;
        }
          
        }
    
    
    for(var i=startIndex+1; i<=this.latestExpression.length-1;i++ ){
        if(this.latestExpression.charAt(i) != '/' && this.latestExpression.charAt(i) != '+' && this.latestExpression.charAt(i) != '-' && this.latestExpression.charAt(i) != '*'){
            this.rightSideVal = this.rightSideVal+this.latestExpression.charAt(i);
      }else{
         this.endMultiIdex= i--;        
          break;
        }
    }
  //end of block
    if(this.leftSideVal != "" && this.rightSideVal!="" ){
        this.replaceExpression =this.multipicationTotalExpression(this.leftSideVal.toString(),this.rightSideVal.toString());
        this.tobeReplace  = this.leftSideVal.concat("*").concat(this.rightSideVal.toString());
        this.latestExpression= this.latestExpression.replace(this.tobeReplace.toString(),this.replaceExpression.toString());
        
    }else if (this.leftSideVal != ""){
        this.replaceExpression =this.leftSideVal;
        this.tobeReplace  = this.leftSideVal.concat("*");
        this.latestExpression= this.latestExpression.replace(this.tobeReplace.toString(),this.replaceExpression.toString());
        
    }else if(this.rightSideVal != ""){
        this.replaceExpression =this.rightSideVal;
        this.tobeReplace  = ("*").concat(this.rightSideVal.toString());
        this.latestExpression= this.latestExpression.replace(this.tobeReplace.toString(),this.replaceExpression.toString());
        
    }
    this.leftSideVal ="";
    this.rightSideVal="";
    this.tobeReplace = "";
  }
  /**
  * @desc will calculate the right child and left child of a operator and send it to div method to get the output
  * @param number $startIndex - start index to start the parse
  * @return String - return result
  * 
  */
  getDivVal(startIndex:number){
   /**
  * block to get left and right child if a number 
    */
    for(var i=startIndex-1; i>=0;i-- ){
        if(this.latestExpression.charAt(i) != '/' && this.latestExpression.charAt(i) != '+' && this.latestExpression.charAt(i) != '*'){
            if(this.latestExpression.charAt(i) == "-"&& i != 0){
                this.leftSideVal = this.latestExpression.charAt(i)+this.leftSideVal;
                this.fistMultiIndex = i--;
                break;
           }else{
                this.leftSideVal = this.latestExpression.charAt(i)+this.leftSideVal;
          }
      }else{
          this.fistMultiIndex = i--;
          break;
        }
          
        }
    
    
    for(var i=startIndex+1; i<=this.latestExpression.length-1;i++ ){
        if(this.latestExpression.charAt(i) != '/'&& this.latestExpression.charAt(i) != '-' && this.latestExpression.charAt(i) != '+' && this.latestExpression.charAt(i) != '*'){
            this.rightSideVal = this.rightSideVal+this.latestExpression.charAt(i);
      }else{
         this.endMultiIdex= i--;        
          break;
        }
    }
  
  //end of block
  
    if(this.leftSideVal != "" && this.rightSideVal!="" ){
        this.replaceExpression =this.divisionTotalExpression(this.leftSideVal.toString(),this.rightSideVal.toString());
        this.tobeReplace  = this.leftSideVal.concat("/").concat(this.rightSideVal.toString());
        this.latestExpression= this.latestExpression.replace(this.tobeReplace.toString(),this.replaceExpression.toString());
      
    }else if (this.leftSideVal != ""){
        this.replaceExpression =this.leftSideVal;
        this.tobeReplace  = this.leftSideVal.concat("/");
        this.latestExpression= this.latestExpression.replace(this.tobeReplace.toString(),this.replaceExpression.toString());
        
    }else if(this.rightSideVal != ""){
        this.replaceExpression =this.rightSideVal;
        this.tobeReplace  = ("/").concat(this.rightSideVal.toString());
        this.latestExpression= this.latestExpression.replace(this.tobeReplace.toString(),this.replaceExpression.toString());
        
    }
    this.leftSideVal ="";
    this.rightSideVal="";
    this.tobeReplace = "";
  }
   /**
  * @desc will calculate the right child and left child of a operator and send it to plus method to get the output
  * @param number $startIndex - start index to start the parse
  * @return String - return result
  * 
  */
  getPlusVal(startIndex : number){
  /**
  * block to get left and right child if a number 
    */
    for(var i=startIndex-1; i>=0;i-- ){
        if(this.latestExpression.charAt(i) != '/' && this.latestExpression.charAt(i) != '+' && this.latestExpression.charAt(i) != '*'){
            if(this.latestExpression.charAt(i) == "-"){  
                this.leftSideVal = this.latestExpression.charAt(i)+this.leftSideVal
                this.fistMultiIndex = i--;
                
                break;
           }else{
                this.leftSideVal = this.latestExpression.charAt(i)+this.leftSideVal;
          }
          
      }else{
          this.fistMultiIndex = i--;
          break;
        }
          
        }
    
    
    for(var i=startIndex+1; i<=this.latestExpression.length-1;i++ ){
        if(this.latestExpression.charAt(i) != '/'&& this.latestExpression.charAt(i) != '-' && this.latestExpression.charAt(i) != '+' && this.latestExpression.charAt(i) != '*'){
            this.rightSideVal = this.rightSideVal+this.latestExpression.charAt(i);
      }else{
         this.endMultiIdex= i--;        
          break;
        }
    }
  //end of block
    if(this.leftSideVal != "" && this.rightSideVal!="" ){
        this.replaceExpression =this.addTotalExpression(this.leftSideVal.toString(),this.rightSideVal.toString());
        this.tobeReplace  = this.leftSideVal.concat("+").concat(this.rightSideVal.toString());
      if(this.leftSideVal.indexOf("-")>-1){
        let lVal,rVal;
          if(this.leftSideVal.indexOf(".")==-1){
              lVal = parseInt(this.leftSideVal.replace("-","").toString());
          }else if(this.leftSideVal == "-."){
        lVal = 0;
      }else{
            lVal = parseFloat(this.leftSideVal.replace("-","").toString());
          }
        if(this.rightSideVal.indexOf(".")==-1){
              rVal = parseInt(this.rightSideVal.toString());
          }else{
              rVal = parseFloat(this.rightSideVal.toString());
          }
        if(rVal>lVal){
          this.replaceExpression = ("+").concat(this.replaceExpression.toString());
          this.latestExpression=this.latestExpression.replace(this.tobeReplace.toString(),this.replaceExpression.toString());
        }else{
          this.latestExpression= this.latestExpression.replace(this.tobeReplace.toString(),this.replaceExpression.toString());
        }
      }else{
        this.latestExpression= this.latestExpression.replace(this.tobeReplace.toString(),this.replaceExpression.toString());
      }
       /* if(this.leftSideVal.indexOf("-")>-1){
            if(this.latestExpression.indexOf('+') == this.fistMultiIndex && this.latestExpression.indexOf('/') == this.fistMultiIndex && this.latestExpression.indexOf('*') == this.fistMultiIndex && this.latestExpression.indexOf('-') == this.fistMultiIndex){
                this.latestExpression= this.latestExpression.replace(this.tobeReplace.toString(),this.replaceExpression.toString());
          }else{
              if(this.replaceExpression.indexOf("-")>-1){
                this.latestExpression= ("+").concat(this.latestExpression.replace(this.tobeReplace.toString(),this.replaceExpression.toString()));
              }else{
                this.latestExpression= this.latestExpression.replace(this.tobeReplace.toString(),this.replaceExpression.toString());
              }
            }
        }else{
            if(this.latestExpression.indexOf('+') == this.fistMultiIndex && this.latestExpression.indexOf('/') == this.fistMultiIndex && this.latestExpression.indexOf('*') == this.fistMultiIndex && this.latestExpression.indexOf('-') == this.fistMultiIndex)
                this.latestExpression= this.latestExpression.replace(this.tobeReplace.toString(),this.replaceExpression.toString());
        }*/
        
    }else if (this.leftSideVal != ""){
        this.replaceExpression =this.leftSideVal;
        this.tobeReplace  = this.leftSideVal.concat("+");
        this.latestExpression= this.latestExpression.replace(this.tobeReplace.toString(),this.replaceExpression.toString());
        
    }else if(this.rightSideVal != ""){
        this.replaceExpression =this.rightSideVal;
        this.tobeReplace  = ("+").concat(this.rightSideVal.toString());
        this.latestExpression= this.latestExpression.replace(this.tobeReplace.toString(),this.replaceExpression.toString());
        
    }
    this.leftSideVal ="";
    this.rightSideVal="";
    this.tobeReplace ="";
  }
  
  /**
  * @desc will calculate the right child and left child of a operator and send it to subs method to get the output
  * @param number $startIndex - start index to start the parse
  * @return String - return result
  * 
  */
  
  getMinusVal(startIndex : number){
    
    let minusRightSideOpt : String = "";
    let elseBool : boolean =false;
    /**
     * block to get left and right child if a number start with negative (-)
     */
    
    if(startIndex == 0 && this.latestExpression.charAt(startIndex) == "-"){
      for(var i=startIndex+1; i<=this.latestExpression.length-1;i++ ){
       if(this.latestExpression.charAt(i) != '/' && this.latestExpression.charAt(i) != '+' && this.latestExpression.charAt(i) != '*' && this.latestExpression.charAt(i) != '-'){
            
                this.leftSideVal = this.leftSideVal+this.latestExpression.charAt(i);
      }else{
         
          elseBool = true;         
          minusRightSideOpt = this.latestExpression.charAt(i);
          startIndex = i;
          this.fistMultiIndex = 0;
          break;
        }
          
         
        }
      if(elseBool){      
        this.leftSideVal = "-"+this.leftSideVal.toString();
      }else{
        startIndex = i;
        this.fistMultiIndex = 0;
        this.leftSideVal = "-"+this.leftSideVal.toString();
      }
      
      for(var i=startIndex+1; i<=this.latestExpression.length-1;i++ ){
          if(this.latestExpression.charAt(i) != '/'&& this.latestExpression.charAt(i) != '-' && this.latestExpression.charAt(i) != '+' && this.latestExpression.charAt(i) != '*'){
              this.rightSideVal = this.rightSideVal+this.latestExpression.charAt(i);
        }else{
           this.endMultiIdex= i--;        
            break;
          }
      }
      // end of block
    }else{
  /**
  * block to get left and right child if a number 
    */
    
    for(var i=startIndex-1; i>=0;i-- ){
       if(this.latestExpression.charAt(i) != '/' && this.latestExpression.charAt(i) != '+' && this.latestExpression.charAt(i) != '*'){
            if(this.latestExpression.charAt(i) == "-"){
              this.leftSideVal = this.latestExpression.charAt(i)+this.leftSideVal;
              this.fistMultiIndex = i--;
              break;
           }else{
                this.leftSideVal = this.latestExpression.charAt(i)+this.leftSideVal;
          }
      }else{
          this.fistMultiIndex = i--;
          break;
        }
         
        }
    
    
    
      for(var i=startIndex+1; i<=this.latestExpression.length-1;i++ ){
          if(this.latestExpression.charAt(i) != '/'&& this.latestExpression.charAt(i) != '-' && this.latestExpression.charAt(i) != '+' && this.latestExpression.charAt(i) != '*'){
              this.rightSideVal = this.rightSideVal+this.latestExpression.charAt(i);
        }else{
           this.endMultiIdex= i--;        
            break;
          }
      }
    }// end of block
  if(minusRightSideOpt == ""){
    if(this.leftSideVal == "."){
      this.leftSideVal ="0";
    }
    if(this.rightSideVal == "."){
      this.rightSideVal ="0";
    }
        if(this.leftSideVal != "" && this.rightSideVal!="" ){
            this.replaceExpression =this.substractionTotalExpression(this.leftSideVal.toString(),this.rightSideVal.toString());
            this.tobeReplace  = this.leftSideVal.concat("-").concat(this.rightSideVal.toString());
            this.latestExpression= this.latestExpression.replace(this.tobeReplace.toString(),this.replaceExpression.toString());
            
        }else if (this.leftSideVal != ""){
            this.replaceExpression =this.leftSideVal;
            this.tobeReplace  = this.leftSideVal.concat("-");
            this.latestExpression= this.latestExpression.replace(this.tobeReplace.toString(),this.replaceExpression.toString());
            
        }else if(this.rightSideVal != ""){
            this.replaceExpression =this.rightSideVal;
            this.tobeReplace  = ("-").concat(this.rightSideVal.toString());
            this.latestExpression= this.latestExpression.replace(this.tobeReplace.toString(),this.replaceExpression.toString());
            
        }
    }else{
    if(this.leftSideVal == "."){
    this.leftSideVal ="0";
    }
    if(this.rightSideVal == "."){
      this.rightSideVal ="0";
    }
       if(this.leftSideVal != "" && this.rightSideVal!="" ){
          let concatOpt :String ="";
          if(minusRightSideOpt == "+"){
            concatOpt ="+"; 
            this.replaceExpression =this.addTotalExpression(this.leftSideVal.toString(),this.rightSideVal.toString()); 
          }else if(minusRightSideOpt == "-"){
            concatOpt ="-"; 
            this.replaceExpression =this.substractionTotalExpression(this.leftSideVal.toString(),this.rightSideVal.toString());
          }else if(minusRightSideOpt == "*"){
            concatOpt ="*"; 
            this.replaceExpression =this.multipicationTotalExpression(this.leftSideVal.toString(),this.rightSideVal.toString());
          }else if(minusRightSideOpt == "/"){
            concatOpt ="/"; 
            this.replaceExpression =this.divisionTotalExpression(this.leftSideVal.toString(),this.rightSideVal.toString());
          }         
       
            
            this.tobeReplace  = this.leftSideVal.concat(concatOpt.toString()).concat(this.rightSideVal.toString());
            this.latestExpression= this.latestExpression.replace(this.tobeReplace.toString(),this.replaceExpression.toString());
            
            
        }else if (this.leftSideVal != ""){
            this.replaceExpression =this.leftSideVal;
            
        }else if(this.rightSideVal != ""){
            this.replaceExpression =this.rightSideVal;
            
        } 
  }
    this.leftSideVal ="";
    this.rightSideVal="";
    this.tobeReplace="";
  }
  
  /**
  * @desc will do multiplication between two input
  * @param String $leftSide - left child of a operator
  * @param String $rightSide - right child of a operator
  * @return String - return result
  * 
  */
  
  multipicationTotalExpression(leftSide : String,rightSide :String){
  if(leftSide == "." || leftSide == "-."){
    leftSide = "0";
  }
  if(rightSide == "." || rightSide == "-."){
    rightSide = "0";
  }
    if(leftSide.indexOf(".")>=0 && rightSide.indexOf(".")>=0){
      return (parseFloat(leftSide.toString())*parseFloat(rightSide.toString())).toString();
    }else if(leftSide.indexOf(".")== -1 && rightSide.indexOf(".")== -1){
      return (parseInt(leftSide.toString())*parseInt(rightSide.toString())).toString();
    }else if(leftSide.indexOf(".")== -1 && rightSide.indexOf(".")>= 0){
      return (parseInt(leftSide.toString())*parseFloat(rightSide.toString())).toString();
    }else if(leftSide.indexOf(".")>= 0 && rightSide.indexOf(".")== -1){
      return (parseFloat(leftSide.toString())*parseInt(rightSide.toString())).toString();
    }
   
   
  }
  
  /**
  * @desc will do addition between two input
  * @param String $leftSide - left child of a operator
  * @param String $rightSide - right child of a operator
  * @return String - return result
  * 
  */
  
  addTotalExpression(leftSide : String,rightSide :String){
  if(leftSide == "." || leftSide == "-."){
    leftSide = "0";
  }
  if(rightSide == "." || rightSide == "-."){
    rightSide = "0";
  }
    if(leftSide.indexOf(".")>=0 && rightSide.indexOf(".")>=0){
      return (parseFloat(leftSide.toString())+parseFloat(rightSide.toString())).toString();
    }else if(leftSide.indexOf(".")== -1 && rightSide.indexOf(".")== -1){
      return (parseInt(leftSide.toString())+parseInt(rightSide.toString())).toString();
    }else if(leftSide.indexOf(".")== -1 && rightSide.indexOf(".")>= 0){
      return (parseInt(leftSide.toString())+parseFloat(rightSide.toString())).toString();
    }else if(leftSide.indexOf(".")>= 0 && rightSide.indexOf(".")== -1){
      return (parseFloat(leftSide.toString())+parseInt(rightSide.toString())).toString();
    }
    
    
  }
  
  /**
  * @desc will do division between two input
  * @param String $leftSide - left child of a operator
  * @param String $rightSide - right child of a operator
  * @return String - return result
  * 
  */
  
  divisionTotalExpression(leftSide : String,rightSide :String){
  if(leftSide == "." || leftSide == "-."){
    leftSide = "0";
  }
  if(rightSide == "." || rightSide == "-."){
    rightSide = "0";
  }
     if(leftSide.indexOf(".")>=0 && rightSide.indexOf(".")>=0){
      return (parseFloat(leftSide.toString())/parseFloat(rightSide.toString())).toString();
    }else if(leftSide.indexOf(".")== -1 && rightSide.indexOf(".")== -1){
      return (parseInt(leftSide.toString())/parseInt(rightSide.toString())).toString();
    }else if(leftSide.indexOf(".")== -1 && rightSide.indexOf(".")>= 0){
      return (parseInt(leftSide.toString())/parseFloat(rightSide.toString())).toString();
    }else if(leftSide.indexOf(".")>= 0 && rightSide.indexOf(".")== -1){
      return (parseFloat(leftSide.toString())/parseInt(rightSide.toString())).toString();
    }
    
    
  }
  /**
  * @desc will subtract between two input
  * @param String $leftSide - left child of a operator
  * @param String $rightSide - right child of a operator
  * @return String - return result
  * 
  */
  substractionTotalExpression(leftSide : String,rightSide :String){
  if(leftSide == "." || leftSide == "-."){
    leftSide = "0";
  }
  if(rightSide == "." || rightSide == "-."){
    rightSide = "0";
  }
    if(leftSide.indexOf(".")>=0 && rightSide.indexOf(".")>=0){
      return (parseFloat(leftSide.toString())-parseFloat(rightSide.toString())).toString();
    }else if(leftSide.indexOf(".")== -1 && rightSide.indexOf(".")== -1){
      return (parseInt(leftSide.toString())-parseInt(rightSide.toString())).toString();
    }else if(leftSide.indexOf(".")== -1 && rightSide.indexOf(".")>= 0){
      return (parseInt(leftSide.toString())-parseFloat(rightSide.toString())).toString();
    }else if(leftSide.indexOf(".")>= 0 && rightSide.indexOf(".")== -1){
      return ( parseFloat(leftSide.toString())-parseInt(rightSide.toString())).toString();
    }
    
    
  }
  
  /**
  * @desc will use for validation purpose any number value can contain only single pointer
  * @param String $val - current input value press by user
  * @param String $totalString - existing expression on calculator pad
  * @param number $optCount - still now how many operator is present in current express
  * @return boolean - return boolean value depend on result
  */
  
  pointValidation(val :String, totalString: String , optCount : number){
    if(totalString.indexOf(".")>-1 && val == "." && optCount == 0){
      return false;
    }else if(totalString.indexOf(".")>-1 && val == "." && optCount > 0){
      for(var i =totalString.length-1; 0<=i ;i--){
        if(totalString.charAt(i) == "+" || totalString.charAt(i) == "-" || 
                  totalString.charAt(i) == "*" || totalString.charAt(i) == "/"){
          let  rValToCheckPOint : String = this.getRightSideVal(i,totalString);
          if(rValToCheckPOint.toString().indexOf(".")>-1){
            return false;
          }else{
            return true;
          }
        }
      }
    }else{
      return true;
    }
  }
  /**
  * @desc will use for validation purpose if two operator press sequentially
  * @param String $val - current input value press by user
  * @param String $totalString - existing expression on calculator pad
  * @return boolean - return boolean value depend on result
  * 
  */
  checkOptSequence(val :String, totalString: String){
    if(totalString.charAt(totalString.length-1) == "+" || totalString.charAt(totalString.length-1) == "-" 
    ||totalString.charAt(totalString.length-1) == "*" ||totalString.charAt(totalString.length-1) == "/" ){
      if(val == "+"|| val == "-" || val == "*"|| val == "/"){
        return false
      }
    }
    return true;
  }
  
   /**
  * @desc will return rightSide child of a operator , suppose input is 3+4, it will return 4
  * @param String $startIndex - parse starting point
  * @param String $expression - expression of input param from which it will fetch RightSide child
  * @return String - return right side child  * 
  */  getRightSideVal(startIndex : number, expression : String){
     let rpVal : String ="";
    for(var i = startIndex+1; i<=expression.length-1;i++ ){
          if(expression.charAt(i) != '/'&& expression.charAt(i) != '-' && expression.charAt(i) != '+' && expression.charAt(i) != '*'){
              rpVal = rpVal+expression.charAt(i);
        } else {
            break;
          }
      }
    return rpVal;
  }
}
