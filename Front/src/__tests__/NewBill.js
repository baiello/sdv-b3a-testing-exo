/**
 * @jest-environment jsdom
 */

import { fireEvent, screen, waitFor } from "@testing-library/dom"
import userEvent from "@testing-library/user-event"
import { localStorageMock } from "../__mocks__/localStorage.js"
import mockStore from "../__mocks__/store.js"
import { ROUTES, ROUTES_PATH } from "../constants/routes"
import NewBill from "../containers/NewBill.js"

describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    describe("When I fill the form with valid values", () => {
      test("Then I can send the form and create a new bill", async () => {
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname })
      }

      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({ type: 'Employee' }))

      onNavigate(ROUTES_PATH['NewBill']);

      expect(screen.queryAllByText('Envoyer une note de frais')).toBeTruthy();

      const newBill = new NewBill({
        document,
        onNavigate,
        store: mockStore,
        localStorage: localStorageMock,
      });

      const handleChangeFileSpy = jest.spyOn(newBill, 'handleChangeFile');
      const handleSubmitSpy = jest.spyOn(newBill, 'handleSubmit');

      const expenseData = {
        type: "Transports",
        name: "Fusée Houston - Mars",
        date: "2023-04-24",
        amount: "234",
        vat: "20",
        pct: "10",
        commentary: "Et ça repart !",
        file: new File(["test file"], "flymetomars.jpg", { type: 'image/jpg' }),
      }

      const inputExpenseType = screen.getByTestId("expense-type");
      const inputExpenseName = screen.getByTestId("expense-name");
      const inputExpenseDate = screen.getByTestId("datepicker");
      const inputExpenseAmount = screen.getByTestId("amount");
      const inputExpenseVat = screen.getByTestId("vat");
      const inputExpensePct = screen.getByTestId("pct");
      const inputExpenseCommentary = screen.getByTestId("commentary");
      const inputExpenseFile = screen.getByTestId("file");

      const formNewBill = screen.getByTestId('form-new-bill');
      formNewBill.addEventListener("submit", newBill.handleSubmit);
      inputExpenseFile.addEventListener('change', newBill.handleChangeFile);

      fireEvent.change(inputExpenseType, { target: { value: expenseData.type } });
      fireEvent.change(inputExpenseName, { target: { value: expenseData.name } });
      fireEvent.change(inputExpenseDate, { target: { value: expenseData.date } });
      fireEvent.change(inputExpenseAmount, { target: { value: expenseData.amount } });
      fireEvent.change(inputExpenseVat, { target: { value: expenseData.vat } });
      fireEvent.change(inputExpensePct, { target: { value: expenseData.pct } });
      fireEvent.change(inputExpenseCommentary, { target: { value: expenseData.commentary } });
      userEvent.upload(inputExpenseFile, expenseData.file);

      expect(inputExpenseType.value).toBe(expenseData.type);
      expect(inputExpenseName.value).toBe(expenseData.name);
      expect(inputExpenseDate.value).toBe(expenseData.date);
      expect(inputExpenseAmount.value).toBe(expenseData.amount);
      expect(inputExpenseVat.value).toBe(expenseData.vat);
      expect(inputExpensePct.value).toBe(expenseData.pct);
      expect(inputExpenseCommentary.value).toBe(expenseData.commentary);
      expect(inputExpenseFile.files[0]).toBe(expenseData.file);

      await new Promise(resolve => setTimeout(resolve, 10));
      expect(handleChangeFileSpy).toHaveBeenCalled();
      expect(newBill.fileUrl).toBeTruthy();

      fireEvent.submit(formNewBill);
      expect(handleSubmitSpy).toHaveBeenCalled();

      await waitFor(() => screen.getByText("Mes notes de frais"));
      expect(screen.getByText("Mes notes de frais")).toBeTruthy();
      })
    })
    // describe("When I fill the form with missing values", () => {
    //   test("Then I can't send the form", async () => {
    //   const onNavigate = (pathname) => {
    //     document.body.innerHTML = ROUTES({ pathname })
    //   }

    //   Object.defineProperty(window, 'localStorage', { value: localStorageMock })
    //   window.localStorage.setItem('user', JSON.stringify({ type: 'Employee' }))

    //   onNavigate(ROUTES_PATH['NewBill']);

    //   expect(screen.queryAllByText('Envoyer une note de frais')).toBeTruthy();

    //   const newBill = new NewBill({
    //     document,
    //     onNavigate,
    //     store: mockStore,
    //     localStorage: localStorageMock,
    //   });

    //   const handleChangeFileSpy = jest.spyOn(newBill, 'handleChangeFile');
    //   const handleSubmitSpy = jest.spyOn(newBill, 'handleSubmit');

    //   const expenseData = {
    //     type: "Transports",
    //     name: "Fusée Houston - Mars",
    //     date: "2023-04-24",
    //     amount: "234",
    //     vat: "20",
    //     pct: "10",
    //     commentary: "Et ça repart !",
    //     // file: new File(["test file"], "flymetomars.jpg", { type: 'image/jpg' }),
    //   }

    //   const inputExpenseType = screen.getByTestId("expense-type");
    //   const inputExpenseName = screen.getByTestId("expense-name");
    //   const inputExpenseDate = screen.getByTestId("datepicker");
    //   const inputExpenseAmount = screen.getByTestId("amount");
    //   const inputExpenseVat = screen.getByTestId("vat");
    //   const inputExpensePct = screen.getByTestId("pct");
    //   const inputExpenseCommentary = screen.getByTestId("commentary");
    //   const inputExpenseFile = screen.getByTestId("file");

    //   const formNewBill = screen.getByTestId('form-new-bill');
    //   formNewBill.addEventListener("submit", newBill.handleSubmit);
    //   inputExpenseFile.addEventListener('change', newBill.handleChangeFile);

    //   fireEvent.change(inputExpenseType, { target: { value: expenseData.type } });
    //   fireEvent.change(inputExpenseName, { target: { value: expenseData.name } });
    //   fireEvent.change(inputExpenseDate, { target: { value: expenseData.date } });
    //   fireEvent.change(inputExpenseAmount, { target: { value: expenseData.amount } });
    //   fireEvent.change(inputExpenseVat, { target: { value: expenseData.vat } });
    //   fireEvent.change(inputExpensePct, { target: { value: expenseData.pct } });
    //   fireEvent.change(inputExpenseCommentary, { target: { value: expenseData.commentary } });
    //   // userEvent.upload(inputExpenseFile, expenseData.file);

    //   expect(inputExpenseType.value).toBe(expenseData.type);
    //   expect(inputExpenseName.value).toBe(expenseData.name);
    //   expect(inputExpenseDate.value).toBe(expenseData.date);
    //   expect(inputExpenseAmount.value).toBe(expenseData.amount);
    //   expect(inputExpenseVat.value).toBe(expenseData.vat);
    //   expect(inputExpensePct.value).toBe(expenseData.pct);
    //   expect(inputExpenseCommentary.value).toBe(expenseData.commentary);
    //   // expect(inputExpenseFile.files[0]).toBe(expenseData.file);

    //   // await new Promise(resolve => setTimeout(resolve, 10));
    //   // expect(handleChangeFileSpy).toHaveBeenCalled();
    //   // expect(newBill.fileUrl).toBeTruthy();

    //   fireEvent.submit(formNewBill);
    //   expect(handleSubmitSpy).toHaveBeenCalled();

    //   await waitFor(() => screen.getByText("Mes notes de frais"));
    //   expect(screen.getByText("Mes notes de frais")).toBeTruthy();
    //   })
    // })
  })
})
