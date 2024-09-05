# Parteetime

**Parteetime** is a web application that helps golfers find and book tee times at golf courses near their location or any chosen destination. This app is designed to simplify the process of finding available tee times, saving users the time and hassle of checking multiple courses manually. 

## Features

- **Search Tee Times by Location and Date**: Enter your location and desired date to find available tee times at nearby golf courses.
- **Detailed Tee Time Information**: View detailed information for each tee time, including:
  - Time of play
  - Price per player
  - Number of golfers
  - Cart fees (if applicable)
- **Filter Options**: After selecting a location and date, refine your search with filters like:
  - Time of day (Morning, Afternoon, Evening)
  - Price range
  - Number of golfers
- **Sorted by Distance**: Tee times are sorted by proximity to your selected location.
- **"BOOK" Button**: Directly book your tee time through the course’s booking site by clicking the "BOOK" button under each listing.
- **Save Favorite Courses**: Create an account to save your favorite courses and get notifications when new tee times are released.
- **Better than GolfNow**: Parteetime improves on existing solutions by offering a more user-friendly experience, making it faster and easier to find the best tee times.

## Why Parteetime?

Finding available tee times can take 5+ minutes per course, especially when you have to search multiple sites. **Parteetime** consolidates this information into one place, giving you quick access to the best available times with filtering options to customize your search.

## Tech Stack

- **Frontend**: React.js, Next.js
- **Backend**: Next.js, REST APIs
- **Database**: Supabase
- **Hosting**: Vercel

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/vcampos4545/parteetime.git
    ```

2. Install dependencies:
    ```bash
    cd parteetime
    yarn install
    ```

3. Start the development server:
    ```bash
    yarn dev
    ```

4. Open your browser and visit `http://localhost:3000` to view the application.

## Usage

- **Search for Tee Times**: Use the search bar to enter your location and preferred date, then view available tee times.
- **Filter Results**: Narrow down your search using the available filters.
- **Book Tee Times**: Click the "BOOK" button under any tee time to be redirected to the course’s booking site.
- **Save Favorite Courses**: Create an account to track your favorite courses and get notified about new tee times.

## Contributing

We welcome contributions! Please feel free to submit a pull request or open an issue if you find a bug or have a feature request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- Inspired by existing tee time services like GolfNow, but designed to provide a faster and more user-friendly experience.
```
