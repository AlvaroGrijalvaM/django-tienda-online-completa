# Project README

## Instrucciones de Instalación y Ejecución

### 1. Backend (Django)
1. Navegar al directorio `backend`:
   ```bash
   cd backend
   ```
2. Crear y activar el entorno virtual:
   ```bash
   python -m venv venv
   # En Windows (PowerShell):
   ./venv/Scripts/Activate.ps1
   ```
3. Instalar las dependencias:
   ```bash
   pip install -r requirements.txt
   ```
4. Realizar migraciones y crear superusuario:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   python manage.py createsuperuser
   ```
5. Ejecutar el servidor de desarrollo:
   ```bash
   python manage.py runserver
   ```

### 2. Frontend (React)
1. Navegar al directorio `frontend`:
   ```bash
   cd frontend
   ```
2. Instalar dependencias:
   ```bash
   npm install --legacy-peer-deps
   ```
3. Ejecutar en modo desarrollo:
   ```bash
   npm run dev
   ```
