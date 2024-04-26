import tkinter as tk

class Application(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("Accounting")
        self.geometry("500x200")
        self.create_widgets()

    def create_widgets(self):
        tk.Label(self, text="Hello, welcome to my accounting application!", font=("Arial", 12)).pack(pady=20)
        tk.Label(self, text="By Elon Musk", font=("Arial", 12)).pack(pady=20)
        tk.Button(self, text="Exit", command=self.destroy).pack(pady=10)

def main():
    app = Application()
    app.mainloop()

if __name__ == "__main__":
    main()
