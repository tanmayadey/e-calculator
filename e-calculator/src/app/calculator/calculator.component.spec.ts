import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorComponent } from './calculator.component';
import { CalculatorService } from '../calculator.service';


describe('CalculatorComponent', () => {
  it("sholud return 10 if input is 5+5",()=>{
   let clacServ = new CalculatorService();
  
      let comp = new CalculatorComponent(clacServ);
        comp.optCount = 1;
        const result = comp.getValue("5+5");
        expect(result).toBe("= 10");
      
      })
  
  it("sholud return 15 if input is 20-5",()=>{
   let clacServ = new CalculatorService();
  
      let comp = new CalculatorComponent(clacServ);
        comp.optCount = 1;
        const result = comp.getValue("20-5");
        expect(result).toBe("= 15");
      
      })
  
  it("sholud return -15 if input is -45+30",()=>{
   let clacServ = new CalculatorService();
  
      let comp = new CalculatorComponent(clacServ);
        comp.optCount = 1;
        const result = comp.getValue("-45+30");
        expect(result).toBe("= -15");
      
      })
  
  it("should return 3 if it get two operation sequentially 3*-",()=>{
   let clacServ = new CalculatorService();
  
      let comp = new CalculatorComponent(clacServ);
        comp.optCount = 1;
        const result = comp.getValue("3*-");
        expect(result).toBe("= 3");
      
      })
  
  it("should return 15 if it get two operation sequentially 3*5",()=>{
   let clacServ = new CalculatorService();
  
      let comp = new CalculatorComponent(clacServ);
        comp.optCount = 1;
        const result = comp.getValue("3*5");
        expect(result).toBe("= 15");
      
      })
  
  it("should return 2 if it get two operation sequentially 10*5",()=>{
   let clacServ = new CalculatorService();
  
      let comp = new CalculatorComponent(clacServ);
        comp.optCount = 1;
        const result = comp.getValue("10/5");
        expect(result).toBe("= 2");
      
      })

});