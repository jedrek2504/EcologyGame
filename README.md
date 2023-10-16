# EcologyGame (IOAD 2)
## Project modules - 16.10.2023
# User management module
- User authentication interface
    - Create, modify, delete account
    - Sign in/sign out user ===> unique session token
    - Get user info by session token
- User relationship interface
    - Add relationship
    - Remove relationship
    - List user relationships 
- User status interface
    - receive user structure change event (SSE/Websocket?)
    - multicast user action

- Mail management interface
        
    
    Interfejs uwierzytelniania użytkowników - utwórz, zmodyfikuj, usuń konto, zaloguj, wyloguj, pobierz token, pobierz user info by token, krypto; interfejs powiązań użytkowników - dodaj, usuń powiązanie użytkowników, pobierz powiązania dla tokenu; ewentualnie interfejs dla zdarzeń zmiany stanu obiektu userinfo; Ewentualnie interfejs SMTP -weryfikacja adresu mailowego użytkownika, ewentualnie spamowanie użytkownika na maila (ala Duolingo)
# Forum module
# Leaderboard module (?)
# Core module / game module
