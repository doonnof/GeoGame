import { Subject } from "../Subject";
import {expect, describe, test, jest} from '@jest/globals';
describe("subject", function() {

  test("subject должен отдавать значение", function(){
    const value$ = new Subject(0)
    expect(value$.get()).toBe(0)
  })
  test("subject должен устанавливать значение", function(){
    const value$ = new Subject(0)
    expect(value$.get()).toBe(0)
    value$.set(1)
    expect(value$.get()).toBe(1)
  })
  test("subject должен подписывать слушателя", function(){
    const value$ = new Subject(0)
    function listener(){}
    value$.subscribe(listener)
    expect(value$.listeners.has(listener)).toBe(true)
  })
  test("subject должен отписывать слушателя", function(){
    const value$ = new Subject(0)
    function listener(){}
    value$.subscribe(listener)
    expect(value$.listeners.has(listener)).toBe(true)
    value$.unsubscribe(listener)
    expect(value$.listeners.has(listener)).toBe(false)

  })
  test("subject должен уведомлять слушателя", function(){
    const value$ = new Subject(0)
    const listener = jest.fn(()=>{})
    value$.subscribe(listener)
    value$.set(1)
    expect (listener).toBeCalled()
    value$.unsubscribe(listener)
    value$.set(1)
    expect (listener).toBeCalledTimes(1)
  })
});