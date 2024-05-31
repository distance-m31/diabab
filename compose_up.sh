# Some commands
docker compose up -f docker-compose.yml --build

az webapp create --resource-group DiabResGroup --plan DiabAppServicePlan --name diabapp --multicontainer-config-type compose --multicontainer-config-file docker-compose.yml
az webapp config container set --resource-group DiabResGroup --name diabapp --multicontainer-config-type compose --multicontainer-config-file docker-compose.yml
