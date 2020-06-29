
FROM node
WORKDIR '/opt/ReactApp'
#COPY package.json .
LABEL programmer="DANG Vincent-Nam <dang.vincentnam@gmail.com>"
RUN npx create-react-app mygates_react_app
# Copy all local files into the image.
#COPY . .
WORKDIR '/opt/ReactApp/mygates_react_app'
RUN rm -rf src
COPY src src
RUN npm install @material-ui/core && npm install @material-ui/icons \
    && npm install react-router-dom && npm install recharts \
    && npm install axios && npm install react-leaflet \
    && npm install leaflet && npm install react-mapbox-gl mapbox-gl --save \
    && npm install material-table
RUN npm install
RUN npm audit fix

# Build for production.
RUN npm run build --production

# Install `serve` to run the application.
RUN npm install -g serve
EXPOSE 5000
# Bug in create-react-app that need to get CI=true in env
# see https://github.com/facebook/create-react-app/commit/7e6d6cd05f3054723c8b015c813e13761659759e
ENV CI=true
# Set the command to start the node server.
#CMD serve -s build
CMD npm start
# Tell Docker about the port we'll run on.
