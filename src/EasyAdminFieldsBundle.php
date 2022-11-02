<?php

namespace Insitaction\EasyAdminFieldsBundle;


use EasyCorp\Bundle\EasyAdminBundle\Config\Asset;
use EasyCorp\Bundle\EasyAdminBundle\Config\Assets;
use Insitaction\EasyAdminFieldsBundle\Field\Configurator\EnumConfigurator;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Loader\Configurator\ContainerConfigurator;
use Symfony\Component\HttpKernel\Bundle\AbstractBundle;
use Insitaction\EasyAdminFieldsBundle\Asset\AssetPackage;
use function Symfony\Component\DependencyInjection\Loader\Configurator\service;

class EasyAdminFieldsBundle extends AbstractBundle
{
    public function loadExtension(array $config, ContainerConfigurator $container, ContainerBuilder $builder): void
    {
        $services = $container->services()
            ->defaults()->private();

        $services
            ->set(AssetPackage::class)
            ->arg(0, service('request_stack'))
            ->tag('assets.package', ['package' => AssetPackage::PACKAGE_NAME]);

        $services
            ->set(EnumConfigurator::class)
            ->arg(0, service('translator'))
            ->tag('ea.field_configurator');
    }

    public static function configureAssets(Assets $asset): Assets
    {
        $jsAsset = Asset::new('app.js')->package(AssetPackage::PACKAGE_NAME);
        $cssAsset = Asset::new('app.css')->package(AssetPackage::PACKAGE_NAME);

        return $asset
            ->addJsFile($jsAsset)
            ->addCssFile($cssAsset);
    }
}