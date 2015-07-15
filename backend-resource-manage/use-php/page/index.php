<!doctype html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>FIS3 Pure PHP DEMO</title>
    <meta name="keywords" content="" />
    <meta name="description" content="" />

    <!-- 使用modjs作为资源加载器 -->
    <?php framework('static/js/mod.js'); ?>
    
    <!-- 标记css输出位置 -->
    <?php placeholder('css');?>

    <!-- 加载css -->
    <?php import('static/css/tooplate_style.css'); ?>
    <?php import('static/css/coda-slider.css'); ?>

    <!-- 加载同步的js -->
    <?php import('static/js/jquery-1.2.6.js'); ?>
    <?php import('static/js/jquery.easing.1.3.js'); ?>
    
   
    
</head>
<body>    
  <div id="slider">
      <div id="tooplate_wrapper">

          <?php widget("widget/sidebar/sidebar.php"); ?>
      
          <div id="content">
            <div class="scroll">
              <div class="scrollContainer">
                
                <?php widget("widget/home/home.php",array('title'=>'FIS3 纯php解决方案DEMO')); ?>
                
                <?php widget("widget/about/about.php"); ?>
                
                <?php widget("widget/service/service.php"); ?>
                
                <?php widget("widget/gallery/gallery.php"); ?>

                <?php widget("widget/contact/contact.php"); ?>
                
              </div>
            </div><!-- end of scroll -->
          </div>
      </div> <!-- end of content -->
  </div>

  <!-- 加载组件及对应依赖的js和css -->
  <?php widget("widget/footer/footer.php"); ?>
  

  <!-- 收集style片段以便在顶部输出,style标签可选 -->
  <?php styleStart() ?>
  <style type="text/css"> 
    footer{
       margin: *;
    }
  </style>
  <?php styleEnd() ?> 

  <!-- 收集script片段并分析其依赖。
    如果不想改变内嵌js的位置可以不用php包裹，但注意此时可能modjs还没加载 -->
  <?php scriptStart(); ?>
    <script type="text/javascript">
      require.async('widget/scroll/scroll.js',function(scroll){
        scroll.init();
      })  
    </script>
  <?php scriptEnd(); ?>


  <!-- 您也可以通过注释在html中声明依赖 -->
  <!--
    @require "widget/footer/test.css"
  -->
  


  <!-- js输出位置，放在底部加快页面解析 -->
  <?php placeholder('js'); ?>

  

</body>
</html>