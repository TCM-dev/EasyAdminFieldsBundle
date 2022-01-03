<?php

namespace Insitaction\EasyAdminFieldsBundle\Field;

use EasyCorp\Bundle\EasyAdminBundle\Field\FieldTrait;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;

final class DependentAssociationField
{
    /*
     * Edited version of ChoiceField from easyadmin bundle, to make it a dependant choice field
     */

    use FieldTrait;

    public const OPTION_AUTOCOMPLETE = 'autocomplete';
    public const OPTION_CRUD_CONTROLLER = 'crudControllerFqcn';
    public const OPTION_WIDGET = 'widget';
    public const OPTION_QUERY_BUILDER_CALLABLE = 'queryBuilderCallable';
    /** @internal this option is intended for internal use only */
    public const OPTION_RELATED_URL = 'relatedUrl';
    /** @internal this option is intended for internal use only */
    public const OPTION_DOCTRINE_ASSOCIATION_TYPE = 'associationType';

    public const WIDGET_AUTOCOMPLETE = 'autocomplete';
    public const WIDGET_NATIVE = 'native';

    /** @internal this option is intended for internal use only */
    public const PARAM_AUTOCOMPLETE_CONTEXT = 'autocompleteContext';

    /**
     * @param string|false|null $label
     */
    public static function new(string $propertyName, $label = null): self
    {
        $self = new self();
        $uniqID = $self->getAsDto()->getUniqueId();

        return $self
            ->setProperty($propertyName)
            ->setLabel($label)
            ->setTemplateName('crud/field/association')
            ->setFormType(EntityType::class)
            ->addCssClass('field-association')
            ->addCssClass("field-dependent uniqID-$uniqID")
            ->setDefaultColumns('col-md-7 col-xxl-6')
            ->setCustomOption(self::OPTION_AUTOCOMPLETE, false)
            ->setCustomOption(self::OPTION_CRUD_CONTROLLER, null)
            ->setCustomOption(self::OPTION_WIDGET, self::WIDGET_AUTOCOMPLETE)
            ->setCustomOption(self::OPTION_QUERY_BUILDER_CALLABLE, null)
            ->setCustomOption(self::OPTION_RELATED_URL, null)
            ->setCustomOption(self::OPTION_DOCTRINE_ASSOCIATION_TYPE, null)
            // To use ChoiceField configurator
            ->setFieldFqcn(\EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField::class);
    }

    public function autocomplete(): self
    {
        $this->setCustomOption(self::OPTION_AUTOCOMPLETE, true);

        return $this;
    }

    public function renderAsNativeWidget(bool $asNative = true): self
    {
        $this->setCustomOption(self::OPTION_WIDGET, $asNative ? self::WIDGET_NATIVE : self::WIDGET_AUTOCOMPLETE);

        return $this;
    }

    public function setCrudController(string $crudControllerFqcn): self
    {
        $this->setCustomOption(self::OPTION_CRUD_CONTROLLER, $crudControllerFqcn);

        return $this;
    }

    public function setQueryBuilder(\Closure $queryBuilderCallable): self
    {
        $this->setCustomOption(self::OPTION_QUERY_BUILDER_CALLABLE, $queryBuilderCallable);

        return $this;
    }

    public function setCallbackURL(string $url): self
    {
        $this->addHtmlContentsToHead($this->getCallbackURLHTML($url));

        return $this;
    }

    public function setDependance(string $propertyName): self
    {
        $this->addHtmlContentsToHead($this->getDependanceHTML($propertyName));

        return $this;
    }

    private function getCallbackURLHTML(string $url): string
    {
        $uniqID = $this->dto->getUniqueId();

        return "<div data-field='dependent-association-field' data-uniq-id='$uniqID' data-key='url' data-value='$url'></div>";
    }

    private function getDependanceHTML(string $propertyName): string
    {
        $uniqID = $this->dto->getUniqueId();

        return "<div data-field='dependent-association-field' data-uniq-id='$uniqID' data-key='propertyName' data-value='$propertyName'></div>";
    }
}