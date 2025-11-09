docker swarm
Usarlo en un servidor,m y otros servidores para unir

```bash
docker swarm
ip addr # ver tu ip 212.47.64.14/21
docker swarm init --advertise-addr 212.47.64.14 #   docker swarm join --token SWMTKN-1-

docker info # ver info Swarm: active
#   NodeID: pxnufbjrnxowrgsc5bfuqxdtk
#   Is Manager: true
#   ClusterID: t2hc47wt0ny7ef8cwzrpwgycx
#   Managers: 1
#   Nodes: 1
#   Data Path Port: 4789
#   Orchestration:
#    Task History Retention Limit: 5
#   Raft:
#    Snapshot Interval: 10000
#    Number of Old Snapshot

docker node ls  # ver lo que tenemos en nodos (solo los managers lo pueden ver LEADER  - reachable)
 docker swarm join-token worker # nos da token para hacer union , worker o manager

 sudo systemctl start docker # si quieres detener docker

 docker node promote idnode # convertir de worker a manager
 docker node demote idnode # convertir de manager a worker

# otra forma de convertir
 docker node update --role manager iddenode
 docker node update --role worker iddenode
 # !! no se puede crear mas de 7 managers

# crear servicio
 docker service create --name nombredeservicio httpd # imagen de apache
 docker service ls

docker service ps nombredeservicio
docker service inspect nombredeservicio --pretty

# crear servicio y crear puerto en todos los servidores puerto 9000 -p 9000:80 tambien funciona
docker service create --name nombredeservicio --publish published=9000, target=80

# crea 5 tasks
docker service scale nomnbrdeservicio=5
docker service ps nombredeservicio

docker service update --limit-cpu 1 nombredeservicio
docker service update --limit-memory 10m nombredeservicio

#  salir de docker swarm
docker swarm leave

```
