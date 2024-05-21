1. opis
   
   Aplikacja stworzona z wykorzystaniem .Net i React.
   Funkcje aplikacji
   - wyswietlanie listy kontaktów
   - logowanie
   - dodawanie/edycje/usuwanie kontaktów (jako zalogowany użytkownik)
    
2. Uruchomienie
    - git clone ...
    - cd contactApp.Server
    - dotnet build
    - dotnet run
3. opis klas
    struktura projektu:
    - contactApp.client
      - components (folder zawierajacy elementy ui)
    - contactApp.Server
      - Controllers -folder zawierajacy klasy AccountController i ContactsController udostępniające interfejs api do logowania i zarządzania kontaktami
      - Entities - folder zawiera klasy Contact i User zawierajace przechowywane informacje o kontaktach i uzytkowniku
      - Exceptions - generowane wyjątki
      - Models - klasy LoginDto i RegisterUserDTO 
        - Validators - zawiera klasy odpowiedzialne za sprawdzanie poprawności wprowadzanych danych dla logowania użytkownika oraz nowych kontaktów
      - Services - zawiera klasę AccountService zawierającą metody używane podczas logowania i rejestracji takie jak RegisterUser i GenetareJWT