<?php

namespace Insitaction\EasyAdminFieldsBundle;


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
    }
}