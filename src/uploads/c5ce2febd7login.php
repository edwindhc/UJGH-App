<?php 
error_reporting(E_ERROR | E_PARSE);
include_once 'server.php';
include 'index.php';	
?>
<!DOCTYPE html>
<html>
<head>
  <title>Proyectos TET</title>
  <link rel="stylesheet" type="text/css" href="css/creative.css">
  <link rel="icon" href="IMG/icono.ico">
</head>

<body><script id="__bs_script__">//<![CDATA[
    document.write("<script async src='/browser-sync/browser-sync-client.js?v=2.26.7'><\/script>".replace("HOST", location.hostname));
//]]></script>

		<div class="container-fluid">
			<div class="row">
				<div class="col-lg-12">		
					<div class="card">
						<div class="loginBox">
						<img src="img/logo2.png" href="index.html" class="img-responsive" alt="UJGH">
							<h2>Login</h2>
							<form action="check-login.php" method="post">                           	
								<div class="form-group">									
									<input type="email" class="form-control input-lg" name="email" placeholder="Correo" required>        
								</div>							
								<div class="form-group">        
									<input type="password" class="form-control input-lg" name="password" placeholder="Contraseña" required>       
								</div>								    
									<button type="submit" class="btn btn-success btn-block">Login</button>
							</form>
							<!-- Collapse a form when user click Lost your password? link-->
							<p><a href="#showForm" data-toggle="collapse" aria-expanded="false" aria-controls="collapse">¿Olvidaste tu contraseña?</a></p>	
							<div class="collapse" id="showForm">
								<div class='well'>
									<form action="password-recovery.php" method="post">
										<div class="form-group">										
											<input type="email" class="form-control" name="email" placeholder="Coloca tu correo." required>
										</div>
										<button type="submit" class="btn btn-dark">Recupera tu contraseña</button>
									</form>								
								</div>
							</div>
													
							<hr><p>¿No tienes cuenta aun? <a href="register.php" title="Create an account">Registrate</a></p>								
						</div><!-- /.loginBox -->	
					</div><!-- /.card -->
				</div><!-- /.col -->
			</div><!--/.row-->
		</div><!-- /.container -->

		<!-- Optional JavaScript -->
		<!-- jQuery first, then Popper.js, then Bootstrap JS -->
		<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
		<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>	
  
    </body>
</html>
