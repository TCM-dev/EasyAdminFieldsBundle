<?php

namespace Insitaction\EasyAdminFieldsBundle\Field;

use EasyCorp\Bundle\EasyAdminBundle\Field\DateField;
use EasyCorp\Bundle\EasyAdminBundle\Field\FieldTrait;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;
use Insitaction\EasyAdminFieldsBundle\Enum\EnumPublishable;

class ImagePreviewField
{
    use FieldTrait;

    public static function new(string $propertyName, $label = null, $basePath, $uploadDir): ImageField
    {
        $self = new self();
        $uniqID = $self->getAsDto()->getUniqueId();

        return ImageField::new($propertyName, $label)
            ->addCssClass("field-image-preview field-image-preview-$uniqID")
            ->setBasePath($basePath)
            ->setUploadDir($uploadDir)
            ->addHtmlContentsToHead("<div class='field-image-preview-basePath-$uniqID' data-value='$basePath'></div>");
    }
}