#!/bin/bash
set -o allexport  # Automatically export all variables
source .env       # Load environment variables from .env
set +o allexport  # Stop exporting
# Run the command and check for success
if npx expo run:android --no-build-cache; then
    echo "Build successful!"
else
    echo "Build failed, cleaning and retrying..."
    cd android && ./gradlew clean && cd ..
    
    # Retry the command
    if npx expo run:android --no-build-cache; then
        echo "Build successful after cleaning!"
    else
        echo "Build failed again even after cleaning."
        exit 1  # Exit with an error code
    fi
fi
