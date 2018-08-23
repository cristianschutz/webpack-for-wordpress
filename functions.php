<?php 
	
	// redirect to login
	if( !is_user_logged_in() && !is_admin() && $GLOBALS['pagenow'] !== 'wp-login.php') {
		wp_redirect( home_url( '/wp-admin' ) );
		exit;
	}

	// redirect to frontend after login
	function admin_default_page() {
		return home_url();
	}
	add_filter('login_redirect', 'admin_default_page');


	function theme_styles(){
	    wp_enqueue_style( 'theme_css', get_template_directory_uri() . '/assets/css/app.css' );
	}
	add_action( 'wp_enqueue_scripts', 'theme_styles' ); 


	function theme_js(){
	    global $wp_scripts;
	    wp_register_script( 'html5_shiv', 'https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js', '', '', false );
		wp_register_script( 'respond_js', 'https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js', '', '', false );
	    $wp_scripts->add_data( 'html5_shiv', 'conditional', 'lt IE 9' );
		$wp_scripts->add_data( 'respond_js', 'conditional', 'lt IE 9' );
	    wp_enqueue_script( 'theme_js', get_template_directory_uri() . '/assets/js/app.bundle.js', array('jquery'), '', true );
	}
	add_action( 'wp_enqueue_scripts', 'theme_js' );
