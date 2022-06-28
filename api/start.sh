if [ ! -d "./node_modules" ]; then
    echo "node_modules folder does not exist. Installing dependancies..."
    yarn 
fi

yarn start  